import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Student } from "./";

@Entity({ name: "course" })
class Course extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ unique: true, type: "varchar" })
  name!: string;

  @Column({ type: "text" })
  description!: string;
  @Column({ type: "varchar" })
  shift!: string;

  @OneToMany(() => Student, (student) => student.course)
  student?: Student[];
}

export { Course };
