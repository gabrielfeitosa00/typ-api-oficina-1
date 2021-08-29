import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "enrollment" })
class Enrollment extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "date" })
  start!: Date;

  @Column({ type: "date" })
  end!: Date;
  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAt!: Date;
}

export { Enrollment };
