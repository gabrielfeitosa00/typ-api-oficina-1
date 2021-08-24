/* eslint-disable class-methods-use-this */
import { Request, Response } from "express";

import { User, Student, Role } from "../models";

class StudentController {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const student: Student = req.body;

      const checkEmail = await Student.createQueryBuilder("student")
        .leftJoinAndSelect("student.user", "user")
        .where("user.email = :email", { email: student.user.email })
        .getOne();
      const checkphone = await Student.findOne({
        where: { phone: student.phone },
      });
      if (checkEmail) {
        return res
          .status(409)
          .send({ msg: "O email digitado já está cadastrado!" });
      }
      if (checkphone) {
        return res
          .status(409)
          .send({ msg: "O telefone digitado já está cadastrado!" });
      }
      const role = await Role.findOneOrFail({ where: { name: "Student" } });
      const newStudent = Student.create(student);
      newStudent.user.role = role;
      await newStudent.save();
      return res.status(200).send(newStudent);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

export { StudentController };
