import { Router } from "express";
import { UserController } from "../controller";

export const routerUser = Router();
const controller = new UserController();

/**
 * Serviço pra login do user
 */
routerUser.post("/login", controller.login);
