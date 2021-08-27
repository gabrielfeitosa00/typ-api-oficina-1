/* eslint-disable class-methods-use-this */
import { Request, Response } from "express";

import { Teacher } from "../models";

class TeacherController {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const teacher: Teacher = req.body;
      const newTeacher = Teacher.create(teacher);
      await newTeacher.save();
      return res.status(200).send(newTeacher);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { page } = req.query;
      const teachers = await Teacher.findPaginated(Number(page));
      if (teachers.length === 0) {
        return res.status(404).send("No teachers Registred yet");
      }
      return res.status(200).send(teachers);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

export { TeacherController };
