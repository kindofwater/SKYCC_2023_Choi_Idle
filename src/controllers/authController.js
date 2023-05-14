import { checkquery, set, update_ID_pre } from "../DB";

export const checkLoggedIn = (req, res) => {
  const { loggedIn, user } = req.session;

  let result;
  if (loggedIn && user) {
    result = { loggedIn: true, user };
  } else {
    result = { loggedIn: false };
  }

  console.log(result);
  return res.status(200).json(result);
};

export const postSurvey = async (req, res) => {
  const userSlackId = req.session.user.slack_id;

  if (!userSlackId) return res.sendStatus(401);

  const surveyData = req.body;
  const criticalList = [];
  for (const [key, value] of Object.entries(surveyData)) {
    if (value) criticalList.push(key);
  }

  const user = {
    slack_id: userSlackId,
    critical: criticalList,
  };

  await set(userSlackId, criticalList);

  req.session.user = user;

  return res.sendStatus(201);
};

export const startSlackLogin = async (req, res) => {
  const url = "https://slack.com/openid/connect/authorize";
  const config = {
    client_id: process.env.SLACK_CLIENT_ID,
    // client_secret: process.env.SLACK_CLIENT_SECRET,
    scope: "openid,email,profile",
    redirect_uri: "https://localhost:4000/auth/slack/finish",
    response_type: "code",
    state: "af0ifjsldkj",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${url}?${params}`;
  return res.redirect(finalUrl);
};

export const finishSlackLogin = async (req, res) => {
  const code = req.query.code;
  const url = "https://slack.com/api/openid.connect.token";
  const config = {
    client_id: process.env.SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_CLIENT_SECRET,
    code,
    redirect_uri: "https://localhost:4000/auth/slack/finish",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${url}?${params}`;

  try {
    const response = await fetch(finalUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const tokenRequest = await response.json();

    // error process
    if (!("access_token" in tokenRequest)) {
      return res.status(404).redirect(loginFailedUrl);
    }

    const { access_token, id_token } = tokenRequest;
    const apiUrl = "https://slack.com/api";

    // get user data
    const userData = await (
      await fetch(apiUrl + "/openid.connect.userInfo", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-type": "application/json",
        },
      })
    ).json();

    const { sub: slackId, email, name, picture } = userData;

    // TODO: store user data in DB
    const queriedUser = await checkquery(slackId);

    if (!!queriedUser) {
      // exist in DB, go to page /result
      req.session.user = queriedUser;
    } else {
      // not exist, go to page /preference_survey
      // login
      req.session.user = { slack_id: slackId };
    }

    req.session.loggedIn = true;

    return res.status(200).redirect("http://localhost:3000/survey");
  } catch (error) {
    console.error(error);
  }
};
