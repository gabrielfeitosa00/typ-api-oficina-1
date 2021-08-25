import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class TeacherTable1629849937494 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "teacher",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar(60)",
          },
          {
            name: "siape",
            type: "int",
            isUnique: true,
          },
          {
            name: "email",
            type: "varchar(45)",
            isUnique: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("teacher");
  }
}
