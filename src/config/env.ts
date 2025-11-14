import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(process.cwd(), ".env") });

const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  mongoUri:
    process.env.MONGO_URI ??
    "mongodb+srv://abdulbasit:Ye305uAnX00xXpxT@cluster0.mgw5ewr.mongodb.net/xyric",
};

export default env;
