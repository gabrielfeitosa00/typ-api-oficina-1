/* eslint-disable class-methods-use-this */
import { Request, Response } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models";

class UserController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await User.createQueryBuilder("user")
      .leftJoinAndSelect("user.role", "role")
      .where("user.email = :email", { email })
      .addSelect("user.password")
      .getOne();

    if (!user) {
      return res
        .status(401)
        .send({ msg: "O email digitado não está cadastrado!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .send({ msg: "A senha digitada não é válida!", type: "password" });
    }

    const token = jwt.sign({ userid: user.id }, "secret", { expiresIn: "7d" });

    return res.json({ userId: user.id, token, role: user.role.name });
  }
}

export { UserController };
