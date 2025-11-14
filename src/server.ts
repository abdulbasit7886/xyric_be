import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { StatusCodes } from "http-status-codes";
import env from "./config/env";
import connectDB from "./config/db";
import itemRoutes from "./routes/item.routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { httpLogger } from "./utils/logger";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(httpLogger());

app.get("/", (_req, res) =>
  res
    .status(StatusCodes.OK)
    .json({ status: "ok", timestamp: new Date().toISOString() })
);

app.use("/api/items", itemRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async (): Promise<void> => {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`🚀 Server running on http://localhost:${env.port}`);
  });
};

void startServer();

export default app;
