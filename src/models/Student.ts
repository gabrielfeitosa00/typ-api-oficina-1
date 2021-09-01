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
  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  coefficient!: number;
  @ManyToOne(() => Course, (course) => course.student, { cascade: true })
  @JoinColumn()
  course!: Course;
  @OneToOne(() => User, (user) => user.student, { cascade: true })
  @JoinColumn()
  user!: User;
  @OneToMany(() => Grade, (grade) => grade.student)
  grade!: Grade[];

  static async updateCoef(studentId: number) {
    try {
      const student = await this.createQueryBuilder("student")
        .leftJoinAndSelect(
          "student.grade",
          "grade",
          "grade.situation IN ('Reproved','Approved')"
        )
        .where("student.id = :studentId", { studentId })
        .getOneOrFail();

      if (student.grade.length > 0) {
        console.log("here");
        const grades = student.grade.map((item) => item.grade);
        console.log(grades);
        let coefsum = 0;
        for (let i = 0; i < grades.length; i++) {
          coefsum = coefsum + Number(grades[i]);
        }
        const newCoef = coefsum / Number(student.grade.length);
        console.log(newCoef);
        student.coefficient = newCoef;
        await Student.update(student.id, { coefficient: newCoef });
      }
      return student;
    } catch (error) {
      throw error;
    }
  }
}

export { Student };
