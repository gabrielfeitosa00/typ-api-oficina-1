import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
const pathEnv = path.join(process.cwd() + "/.env");
import App from "./server"
dotenv.config({ path: pathEnv });




const app = new App(


  [cors(), helmet()],
   5000
);

app.listen();