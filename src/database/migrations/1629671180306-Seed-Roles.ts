import { MigrationInterface, QueryRunner } from "typeorm";
import { Role } from "../../models";
import { RoleSeed } from "../seeds";

export class SeedRoles1629671180306 implements MigrationInterface {
  public async up(_queryRunner: QueryRunner): Promise<void> {
    const newRoles = Role.create(RoleSeed);
    await Role.save(newRoles);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`delete from typ.role`);
  }
}
