import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User, Course, Grade } from "./";

@Entity({ name: "student" })
class Student extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ unique: true, type: "int" })
  ra!: string;

  @Column({ type: "varchar", nullable: true, default: null })
  phone?: string | null;
  @Column({ type: "decimal", precision: 5, scale: 2 })
  coefficient?: number | null;
  @ManyToOne(() => Course, (course) => course.student, { cascade: true })
  @JoinColumn()
  course!: Course;
  @OneToOne(() => User, (user) => user.student, { cascade: true })
  @JoinColumn()
  user!: User;
  @OneToMany(() => Grade, (grade) => grade.student)
  grade?: Grade[];

  static async updateCoef(studentId: number) {
    const student = await this.createQueryBuilder("student")
      .leftJoinAndSelect(
        "student.grade",
        "grade",
        "grade.situation IN ('Reproved','Approved')"
      )
      .where("student.id = :studentId", { studentId })
      .getOneOrFail();
    if (student.grade) {
      student.coefficient =
        student.grade
          ?.map((item) => item.grade!)
          .reduce((prev, curr) => prev + curr, 0) / student.grade?.length;

      await student.save();
    }
    return student;
  }
}

export { Student };
