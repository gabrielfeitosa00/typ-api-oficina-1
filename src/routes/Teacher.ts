import { Router } from "express";
import { TeacherController } from "../controller";
import { AuthMiddleware, RoleMiddleware } from "../middleware";
export const routerTeacher = Router();
const controller = new TeacherController();

/**
 * Serviço pra login do user
 */
routerTeacher.post(
  "/",
  AuthMiddleware.check(),
  RoleMiddleware.checkRole(["Admin"]),
  controller.store
);
routerTeacher.get(
  "/",
  AuthMiddleware.check(),
  RoleMiddleware.checkRole(["Student"]),
  controller.index
);
