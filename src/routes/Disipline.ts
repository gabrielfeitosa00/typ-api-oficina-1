import { Router } from "express";
import { DisiplineController } from "../controller";
import { AuthMiddleware, RoleMiddleware } from "../middleware";
export const routerDisipline = Router();
const controller = new DisiplineController();

/**
 * Serviço pra login do user
 */
routerDisipline.post(
  "/",
  AuthMiddleware.check(),
  RoleMiddleware.checkRole(["Admin"]),
  controller.store
);
routerDisipline.get(
  "/:code",
  AuthMiddleware.check(),
  RoleMiddleware.checkRole(["Student"]),
  controller.getByCode
);
