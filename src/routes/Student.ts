import { Router } from "express";
import { StudentController } from "../controller";
import { AuthMiddleware, RoleMiddleware } from "../middleware";
export const routerStudent = Router();
const controller = new StudentController();

/**
 * Serviço pra login do user
 */
routerStudent.post(
  "/",
  AuthMiddleware.check(),
  RoleMiddleware.checkRole(["Admin"]),
  controller.store
);
routerStudent.get(
  "/student-info/:id",
  AuthMiddleware.check(),
  RoleMiddleware.checkRole(["Student"]),
  controller.getStudentInfo
);
