import { Router } from "express";
import { routerUser } from "./User";

const routes = Router();

routes.use("/user", routerUser);

export default routes;
