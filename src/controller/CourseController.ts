/* eslint-disable class-methods-use-this */
import { Request, Response } from "express";

import { Course } from "../models";

class CourseController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const courses = await Course.find();
      return res.status(200).send(courses);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

export { CourseController };
