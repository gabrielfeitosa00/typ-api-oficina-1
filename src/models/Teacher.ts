import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Disipline } from "./";

@Entity({ name: "teacher" })
class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "int", unique: true })
  siape!: string;
  @Column({ type: "varchar", unique: true })
  email!: string;

  @ManyToMany(() => Disipline, (disipline) => disipline.teacher)
  @JoinColumn({ name: "teacher_disipline" })
  disipline?: Disipline[];
}

export { Teacher };
