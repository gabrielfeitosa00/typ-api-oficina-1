/* eslint-disable class-methods-use-this */
import { Request, Response } from "express";

import { Grade, Student } from "../models";

class GradeController {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const register: Grade[] = req.body;
      for (let i = 0; i < register.length; i++) {
        let conflict = await Grade.checkIfGradeIsApprovedOrCoursing(
          register[i].student.id,
          register[i].disipline.id
        );
        if (conflict)
          return res
            .status(409)
            .send(
              "You either already coursed this disipline or is coursing it at the moment!"
            );
      }

      const newEnrollment = Grade.create(register);
      await Grade.save(newEnrollment);
      return res.status(200).send(newEnrollment);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  public async indexPastGrades(req: Request, res: Response): Promise<Response> {
    try {
      const { studentId } = req.params;
      const grade = await Grade.getPastGradesByStudent(Number(studentId));
      if (grade.length === 0) {
        return res.status(404).send("No past disiplines  yet");
      }
      return res.status(200).send(grade);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  public async indexCurrentGrades(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { studentId } = req.params;
      const enrollment = await Grade.getCurrentGradesByStudent(
        Number(studentId)
      );
      if (enrollment.length === 0) {
        return res.status(404).send("No past current disiplines  yet");
      }
      return res.status(200).send(enrollment);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { studentId, disiplineId, absence, grade } = req.body;
      const enrollment = await Grade.getGradeByStudentAndDisipline(
        studentId,
        disiplineId
      );
      if (!enrollment) {
        return res
          .status(404)
          .send("This student isn't enrolled in this disipline");
      }

      if (absence > enrollment.disipline.number_of_classes) {
        return res
          .status(409)
          .send(
            "The number of absences cant be more than the numer of classes"
          );
      }

      if (grade > 10) {
        return res.status(409).send("The grade cant be more than 10");
      }
      enrollment.absence = absence;
      enrollment.grade = grade;
      let absenceProportion =
        (absence / enrollment.disipline.number_of_classes) * 100;
      if (grade >= 6 && absenceProportion >= 0.75) {
        enrollment.situation = "Approved";
      } else {
        enrollment.situation = "Reproved";
      }
      await Student.updateCoef(studentId);
      await enrollment.save();
      return res.status(200).send(enrollment);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

export { GradeController };
