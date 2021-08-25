import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./";
@Entity({ name: "role" })
class Role extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "varchar", unique: true })
  name!: string;

  @Column({ type: "text" })
  description!: string;
  @OneToMany(() => User, (user) => user.role)
  user?: User[];
}

export { Role };
