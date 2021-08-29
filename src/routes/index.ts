import { Router } from "express";
import { routerUser } from "./User";
import { routerStudent } from "./Student";
import { routerCourse } from "./Course";
import { routerDisipline } from "./Disipline";
import { routerTeacher } from "./Teacher";
import { routerGrade } from "./Grade";
import { routerEnrollment } from "./Enrollment";

const routes = Router();

routes.use("/user", routerUser);
routes.use("/student", routerStudent);
routes.use("/course", routerCourse);
routes.use("/disipline", routerDisipline);
routes.use("/teacher", routerTeacher);
routes.use("/grade", routerGrade);
routes.use("/enrollment", routerEnrollment);

export default routes;
