import cors from "cors";
import type { Express } from "express";
import express from "express";
import logger from "./middleware/logger";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { tokenRouter } from "routes";
import morgan from "morgan";
import morganBody from "morgan-body";
import helmet from "helmet";
import { authRouter } from "routes/auth.router";
import bodyParser from "body-parser";
import { envConfig } from "config";
import { uploadRouter } from "routes/upload.router";

const main = async () => {
  config();

  const PORT = envConfig.port || 8000;
  const basePath = "/api/v1";

  const app: Express = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(morgan("combined"));
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  morganBody(app, {
    noColors: true,
    logResponseBody: false,
  });

  app.get("/", (_req, res) => {
    res.send("Server is running");
  });

  app.use(basePath + "/token", tokenRouter);
  app.use(basePath + "/auth", authRouter);
  app.use(basePath + "/upload", uploadRouter);

  app.listen(PORT, () => {
    logger.log("info", `Server is running on Port:${PORT}`);
  });
};

main()
  .then(() => {
    logger.info("App started");
  })
  .catch((err) => {
    logger.error("App failed");
    logger.error(err.stack);
  });
