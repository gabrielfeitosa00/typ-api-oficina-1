import { MigrationInterface, QueryRunner } from "typeorm";
import { Role, User } from "../../models";

export class AdminSeed1629764873585 implements MigrationInterface {
  public async up(_queryRunner: QueryRunner): Promise<void> {
    const role = await Role.findOneOrFail({ where: { name: "Admin" } });
    const admin = User.create({
      email: "admin@admin.com",
      password: "password",
      name: "admin",
    });
    admin.role = role;
    await admin.save();
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    await User.delete({ email: "admin@admin" });
  }
}
