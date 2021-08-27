import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Teacher } from "./";

@Entity({ name: "disipline" })
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
  number_of_classes!: number;

  @ManyToMany(() => Teacher, (teacher) => teacher.disipline)
  teacher?: Teacher[];

  static async getByCode(code: string) {
    return await this.createQueryBuilder("disipline")
      .where("disipline.code = :code", { code })
      .getOne();
  }
}

export { Disipline };
