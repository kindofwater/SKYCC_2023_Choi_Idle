import cors from "cors";
import session from "express-session";
import pg from "pg";
import connectPgSimple from "connect-pg-simple";

const pgSession = connectPgSimple(session);

const pgPool = new pg.Pool({
  user: "postgres",
  host: "skycc.c8pqhjn5wq1m.ap-northeast-2.rds.amazonaws.com",
  database: "skycc",
  password: "postgres",
  port: 5432,
});

const whitelist = process.env.CORS_URLS.split(" ");
export const corsMiddleware = cors({
  origin: function (origin, callback) {
    // bypass the requests with no origin (like curl requests, mobile apps, redirect, etc )
    if (!origin) return callback(null, true);

    if (whitelist.indexOf(origin) === -1) {
      var msg = "Not allowed by CORS";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true,
});

export const sessionMiddleware = session({
  secret: process.env.COOKIE_SECRET,
  store: new pgSession({
    pool: pgPool, // Connection pool
    tableName: "user_sessions", // Use another table-name than the default "session" one
    // Insert connect-pg-simple options here
    createTableIfMissing: true,
  }),
  resave: false,
  saveUninitialized: true, // dont save session in DB if he did not login.
  cookie: {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000, // Three Days
    secure: false, // after https
  },
});

export const protectorMiddleware = (req, res, next) => {
  if (req.session && req.session.loggedIn && req.session.user) return next();
  return res.sendStatus(401);
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (req.session && req.session.loggedIn && req.session.user) {
    return res.status(403).redirect(`${whitelist[0]}/`); // user detail 페이지 작성 후에는 거기로 redirect.
  }
  return next();
};
