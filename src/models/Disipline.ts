import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Teacher } from "./";

@Entity({ name: "displine" })
class Disipline extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "varchar", unique: true })
  name!: string;
  @Column({ type: "varchar", unique: true })
  code!: string;

  @Column({ type: "text" })
  description!: string;
  @Column({ type: "int", name: "number_of_classes" })
  numberOfClasses!: number;

  @ManyToMany(() => Teacher, (teacher) => teacher.disipline)
  teacher?: Teacher[];
}

export { Disipline };
