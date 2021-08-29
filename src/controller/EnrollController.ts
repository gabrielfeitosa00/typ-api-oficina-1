/* eslint-disable class-methods-use-this */
import { Request, Response } from "express";

import { Enrollment } from "../models";
import dayjs from "dayjs";

class EnrollmentController {
  public async storeOrUpdate(req: Request, res: Response): Promise<Response> {
    try {
      //TODO create or update method later
      const enrollmentPeriod: Enrollment = req.body;
      const oldEnrollmentPeriod = await Enrollment.findOne();
      let newEnrollmentPeriod;
      if (oldEnrollmentPeriod) {
        newEnrollmentPeriod = Enrollment.merge(oldEnrollmentPeriod, {
          ...enrollmentPeriod,
        });
      } else {
        newEnrollmentPeriod = Enrollment.create(enrollmentPeriod);
      }

      newEnrollmentPeriod.save();
      return res.status(200).send(newEnrollmentPeriod);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
  public async check(_req: Request, res: Response) {
    try {
      const now = dayjs(new Date());
      const enrollmentPeriod = await Enrollment.findOneOrFail();
      if (
        now.isAfter(dayjs(enrollmentPeriod.start)) ||
        now.isBefore(dayjs(enrollmentPeriod.end))
      ) {
        return res.status(200).send(true);
      } else {
        return res.status(200).send(false);
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

export { EnrollmentController };
