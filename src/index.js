import "regenerator-runtime/runtime.js";
import "dotenv/config";
import "./DB";
import app from "./server";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`✅ Server listening on port http://localhost:${PORT}`)
);
