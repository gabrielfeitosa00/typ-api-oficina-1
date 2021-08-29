import { Router } from "express";
import { EnrollmentController } from "../controller";
import { AuthMiddleware, RoleMiddleware } from "../middleware";
export const routerEnrollment = Router();
const controller = new EnrollmentController();

/**
 * Serviço pra login do user
 */
routerEnrollment.post(
  "/create-or-update",
  AuthMiddleware.check(),
  RoleMiddleware.checkRole(["Admin"]),
  controller.storeOrUpdate
);
routerEnrollment.get(
  "/check-enrollment-period",
  AuthMiddleware.check(),
  RoleMiddleware.checkRole(["Student"]),
  controller.check
);
