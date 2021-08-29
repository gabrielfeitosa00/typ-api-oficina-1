import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class GradeUniqueIndex1630027945234 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      "grade",
      new TableIndex({
        columnNames: ["studentId", "disiplineId"],
        isUnique: true,
        name: "unique_disipline_student",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("grade", "unique_disipline_student");
  }
}
