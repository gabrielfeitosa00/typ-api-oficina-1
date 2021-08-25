import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class TeacherDisiplineTable1629850619554 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "teacher_disipline",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "teacherId",
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
    await queryRunner.dropTable("teacher_disipline");
  }
}
