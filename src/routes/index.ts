import { Router } from "express";
import { routerUser } from "./User";
import { routerStudent } from "./Student";

const routes = Router();

routes.use("/user", routerUser);
routes.use("/student", routerStudent);

export default routes;
