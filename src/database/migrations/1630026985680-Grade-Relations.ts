import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class GradeRelations1630026985680 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "grade",
      new TableForeignKey({
        columnNames: ["studentId"],
        referencedColumnNames: ["id"],
        referencedTableName: "student",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
    await queryRunner.createForeignKey(
      "grade",
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
    const table = await queryRunner.getTable("grade");
    const foreignKeyStudent = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("studentId") !== -1
    );
    if (foreignKeyStudent) {
      await queryRunner.dropForeignKey("grade", foreignKeyStudent);
    }
    const foreignKeyDisipline = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("disiplineId") !== -1
    );
    if (foreignKeyDisipline) {
      await queryRunner.dropForeignKey("grade", foreignKeyDisipline);
    }
  }
}
