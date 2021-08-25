import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class TeacherDisiplineRelation1629850766115
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "teacher_disipline",
      new TableForeignKey({
        columnNames: ["teacherId"],
        referencedColumnNames: ["id"],
        referencedTableName: "teacher",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
    await queryRunner.createForeignKey(
      "teacher_disipline",
      new TableForeignKey({
        columnNames: ["disiplineId"],
        referencedColumnNames: ["id"],
        referencedTableName: "disipline",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("teacher_disipline");
    const foreignKeyTeacher = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("teacherId") !== -1
    );
    if (foreignKeyTeacher) {
      await queryRunner.dropForeignKey("teacher_disipline", foreignKeyTeacher);
    }
    const foreignKeyDisipline = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("disiplineId") !== -1
    );
    if (foreignKeyDisipline) {
      await queryRunner.dropForeignKey(
        "teacher_disipline",
        foreignKeyDisipline
      );
    }
  }
}
