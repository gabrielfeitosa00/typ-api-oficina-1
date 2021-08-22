import { Request, Response, NextFunction } from "express";
import { User } from "../models";
class RoleMiddleware {
  public static checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      //Get the user ID from previous midleware
      const id = req.userId;
      //Get user role from the database
      let user: User;

      try {
        user = await User.findOneOrFail(id, { relations: ["role"] });
        let checkResultProfile = true;
        const checkResultUser = roles.includes(user.role.name);

        if (checkResultUser || checkResultProfile) {
          return next();
        } else {
          return res
            .status(401)
            .send("This user isn't authorized to see this route!");
        }
      } catch (error) {
        {
          return res.status(401).send("Unauthorized!");
        }
      }
    };
  };
}

export { RoleMiddleware };
