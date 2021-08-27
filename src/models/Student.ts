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
}

export { Student };
