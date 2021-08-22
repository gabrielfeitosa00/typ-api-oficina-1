import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class StudentUserRelation1629592489825 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "student",
      new TableColumn({
        name: "userId",
        type: "int",
      })
    );

    await queryRunner.createForeignKey(
      "student",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("student");
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("userId") !== -1
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey("student", foreignKey);
    }
    await queryRunner.dropColumn("student", "userId");
  }
}
