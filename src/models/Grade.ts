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
    nullable: true,
    default: null,
  })
  grade?: number | null;
  @Column({ type: "int", nullable: true, default: null })
  absence?: number | null;
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
    displineId: number
  ) {
    return await this.createQueryBuilder("grade")
      .leftJoinAndSelect("grade.student", "student")
      .leftJoinAndSelect("grade.disipline", "disipline")
      .where("grade.studentId = :studentId", { studentId })
      .andWhere("grade.displineId = :displineId", { displineId })
      .getOne();
  }

  static async checkIfGradeIsApprovedOrCoursing(
    studentId: number,
    displineId: number
  ) {
    return await this.createQueryBuilder("grade")
      .where("grade.studentId = :studentId", { studentId })
      .andWhere("grade.displineId = :displineId", { displineId })
      .andWhere("grade.situation IN ('Coursing','Approved')")
      .getOne();
  }
  static async getCurrentGradesByStudent(studentId: number) {
    return await this.createQueryBuilder("grade")
      .leftJoinAndSelect("grade.disipline", "disipline")
      .where("grade.studentId = :studentId", { studentId })
      .andWhere("grade.situation = 'Coursing'")
      .getMany();
  }
  static async getPastGradesByStudent(studentId: number) {
    return await this.createQueryBuilder("grade")
      .leftJoinAndSelect("grade.disipline", "disipline")
      .where("grade.studentId = :studentId", { studentId })
      .andWhere("grade.situation IN ('Reproved','Approved')")
      .getMany();
  }
}

export { Grade };
