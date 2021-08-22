import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import bcrypt from "bcrypt";
import { Role, Student } from "./";

@Entity({ name: "user" })
class User extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ unique: true, type: "varchar" })
  email!: string;

  @Column({ select: false, type: "varchar" })
  password!: string;
  @ManyToOne(() => Role, (role) => role.user)
  role!: Role;
  @OneToOne(() => Student, (student) => student.user)
  student?: User;
  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}

export { User };
