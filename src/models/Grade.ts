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

  @Column({ unique: true, type: "int" })
  ra!: string;

  @Column({ type: "varchar", nullable: true, default: null })
  phone?: string | null;
  @Column({ type: "decimal", precision: 5, scale: 2 })
  coefficient?: number | null;
  @ManyToOne(() => Disipline, { cascade: true })
  @JoinColumn({ name: "disiplineId" })
  disipline!: Disipline;
  @Column({ type: "enum", enum: ["Coursing", "Approved", "Reproved"] })
  situation!: gradeSituation;
  @ManyToOne(() => Student, (student) => student.grade, { cascade: true })
  @JoinColumn({ name: "studentId" })
  student!: Student;

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
