import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
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

  @ManyToMany(() => Disipline, (disipline) => disipline.teacher, {
    cascade: true,
  })
  @JoinTable({ name: "teacher_disipline" })
  disipline?: Disipline[];

  static async findPaginated(page: number) {
    return await this.createQueryBuilder("teacher")
      .leftJoinAndSelect("teacher.disipline", "disipline")
      .skip((page - 1) * 6)
      .take(6)
      .getMany();
  }
}

export { Teacher };
