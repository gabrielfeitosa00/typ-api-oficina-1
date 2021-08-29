import { Router } from "express";
import { GradeController } from "../controller";
import { AuthMiddleware, RoleMiddleware } from "../middleware";
export const routerGrade = Router();
const controller = new GradeController();

/**
 * Serviço pra login do user
 */
routerGrade.post(
  "/",
  AuthMiddleware.check(),
  RoleMiddleware.checkRole(["Student"]),
  controller.store
);
routerGrade.get(
  "/past-grades",
  AuthMiddleware.check(),
  RoleMiddleware.checkRole(["Student"]),
  controller.indexPastGrades
);
routerGrade.get(
  "/current-grades",
  AuthMiddleware.check(),
  RoleMiddleware.checkRole(["Student"]),
  controller.indexCurrentGrades
);
routerGrade.put(
  "/update-grandes-and-absence",
  AuthMiddleware.check(),
  RoleMiddleware.checkRole(["Admin"]),
  controller.update
);
