import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class StudentCourseRelation1629592756793 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "student",
      new TableColumn({
        name: "courseId",
        type: "int",
      })
    );

    await queryRunner.createForeignKey(
      "student",
      new TableForeignKey({
        columnNames: ["courseId"],
        referencedColumnNames: ["id"],
        referencedTableName: "course",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("student");
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("courseId") !== -1
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey("student", foreignKey);
    }
    await queryRunner.dropColumn("student", "courseId");
  }
}
