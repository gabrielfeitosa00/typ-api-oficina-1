import { Router } from "express";
import { CourseController } from "../controller";
import { AuthMiddleware, RoleMiddleware } from "../middleware";
export const routerCourse = Router();
const controller = new CourseController();

/**
 * Serviço pra login do user
 */
routerCourse.get(
  "/",
  AuthMiddleware.check(),
  RoleMiddleware.checkRole(["Student"]),
  controller.index
);
