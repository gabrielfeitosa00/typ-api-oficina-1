import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User, Course } from "./";

@Entity({ name: "student" })
class Student extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ unique: true, type: "int" })
  ra!: string;

  @Column({ type: "varchar", nullable: true, default: null })
  phone?: string | null;
  @Column({ type: "float" })
  coeficient?: number | null;
  @ManyToOne(() => Course, (course) => course.student)
  @JoinColumn()
  course!: Course;
  @OneToOne(() => User, (user) => user.student)
  @JoinColumn()
  user!: User;
}

export { Student };
