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

  @Column({ unique: true, type: "int" })
  ra!: string;

  @Column({ type: "varchar", nullable: true, default: null })
  phone?: string | null;
  @Column({ type: "float" })
  coeficient?: number | null;

  @OneToMany(() => Student, (student) => student.course)
  student?: Student[];
}

export { Course };
