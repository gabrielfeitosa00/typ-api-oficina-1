import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserTable1628984823844 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "email",
            type: "varchar(45)",
            isUnique: true,
          },
          {
            name: "name",
            type: "varchar(45)",
          },
          {
            name: "password",
            type: "varchar(200)",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
