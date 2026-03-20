import express from "express";
import morgan from "morgan";
import cors from "cors";

import helmet from "helmet";
import { CORS_ORIGIN } from "./utils/env.js";
import correoargRouter from "./routes/correoarg.router.js";

const app = express();
let corsconfig = {
  origin: CORS_ORIGIN,
};
app.use(express.json());

app.use(helmet());
app.use(cors(corsconfig));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).send("Something broke!");
});


app.use(correoargRouter);
export default app;
