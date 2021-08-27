import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class GradeTable1630026382913 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "grade",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "situation",
            enum: ["Coursing", "Approved", "Reproved"],
            type: "enum",
            default: "'Coursing'",
          },
          {
            name: "grade",
            type: "decimal(8,2)",
            isNullable: true,
            default: null,
          },
          {
            name: "absence",
            type: "int",
            isNullable: true,
            default: null,
          },
          {
            name: "studentId",
            type: "int",
          },
          {
            name: "disiplineId",
            type: "int",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("grade");
  }
}
