import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { gradeSituation } from "../types";

import { Disipline, Student } from "./";
@Index(["student", "disipline"], { unique: true })
@Entity({ name: "grade" })
class Grade extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;
  @Column({
    type: "decimal",
    precision: 5,
    scale: 2,
    default: 0,
  })
  grade!: number;
  @Column({ type: "int", default: 0 })
  absence!: number;
  @ManyToOne(() => Disipline, { cascade: true })
  @JoinColumn({ name: "disiplineId" })
  disipline!: Disipline;
  @Column({ type: "enum", enum: ["Coursing", "Approved", "Reproved"] })
  situation!: gradeSituation;
  @ManyToOne(() => Student, (student) => student.grade, { cascade: true })
  @JoinColumn({ name: "studentId" })
  student!: Student;

  static async getGradeByStudentAndDisipline(
    studentId: number,
    disiplineId: number
  ) {
    return await this.createQueryBuilder("grade")
      .leftJoinAndSelect("grade.student", "student")
      .leftJoinAndSelect("grade.disipline", "disipline")
      .where("grade.studentId = :studentId", { studentId })
      .andWhere("grade.disiplineId = :disiplineId", { disiplineId })
      .getOne();
  }

  static async checkIfGradeIsApprovedOrCoursing(
    studentId: number,
    disiplineId: number
  ) {
    return await this.createQueryBuilder("grade")
      .where("grade.studentId = :studentId", { studentId })
      .andWhere("grade.disiplineId = :disiplineId", { disiplineId })
      .andWhere("grade.situation IN ('Coursing','Approved')")
      .getOne();
  }
  static async getCurrentGradesByStudent(studentId: number) {
    return await this.createQueryBuilder("grade")
      .select([
        "grade.id",
        "grade.grade as nota",
        "grade.absence as faltas",
        "grade.situation as situacao",
        "disipline.id",
        "disipline.name as nome",
        "disipline.code as codigo",
        "disipline.number_of_classes as total_aulas",

        "(grade.absence/disipline.number_of_classes)*100 as frequencia",
      ])
      .leftJoin("grade.disipline", "disipline")
      .where("grade.studentId = :studentId", { studentId })
      .andWhere("grade.situation = 'Coursing'")
      .getRawMany();
  }
  static async getPastGradesByStudent(studentId: number) {
    return await this.createQueryBuilder("grade")
      .select([
        "grade.id",
        "grade.grade as nota",
        "grade.absence as faltas",
        "grade.situation as situacao",
        "disipline.id",
        "disipline.name as nome",
        "disipline.code as codigo",
        "disipline.number_of_classes as total_aulas",

        "(grade.absence/disipline.number_of_classes)*100 as frequencia",
      ])
      .leftJoin("grade.disipline", "disipline")
      .where("grade.studentId = :studentId", { studentId })
      .andWhere("grade.situation IN ('Reproved','Approved')")
      .getRawMany();
  }
}

export { Grade };
