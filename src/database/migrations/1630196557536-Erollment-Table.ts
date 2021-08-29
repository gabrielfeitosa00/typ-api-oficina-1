import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ErollmentTable1630196557536 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "enrollment",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "start",
            type: "date",
          },
          {
            name: "end",
            type: "date",
          },
          {
            name: "create_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("enrollment");
  }
}
