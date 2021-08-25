import { Router } from "express";
import { routerUser } from "./User";
import { routerStudent } from "./Student";
import { routerCourse } from "./Course";

const routes = Router();

routes.use("/user", routerUser);
routes.use("/student", routerStudent);
routes.use("/course", routerCourse);

export default routes;
