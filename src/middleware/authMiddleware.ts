import { NextFunction, Request, Response } from "express";
import { Tokenpayload } from "../interfaces";
import * as jwt from "jsonwebtoken";

class AuthMiddleware {
  public static check() {
    return async (request: Request, response: Response, next: NextFunction) => {
      const { authorization } = request.headers;
      if (!authorization) {
        return response.sendStatus(401);
      }
      const token = authorization.split(" ")[1];
      try {
        const tokenData = jwt.verify(token, process.env.SECRET as string);
        const { userId } = tokenData as Tokenpayload;
        request.userId = userId;

        return next();
      } catch (error) {
        return response.status(error.status).send(error.message);
      }
    };
  }
}
export { AuthMiddleware };