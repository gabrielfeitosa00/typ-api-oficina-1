import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import routes from "./routes";
const pathEnv = path.join(process.cwd() + "/.env");
import "./database/connection";
import App from "./server";
dotenv.config({ path: pathEnv });

const app = new App(routes, [cors(), helmet()], 5000);

app.listen();
