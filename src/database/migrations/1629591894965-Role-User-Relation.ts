import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class RoleUserRelation1629591894965 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "roleId",
        type: "int",
      })
    );

    await queryRunner.createForeignKey(
      "user",
      new TableForeignKey({
        columnNames: ["roleId"],
        referencedColumnNames: ["id"],
        referencedTableName: "role",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("user");
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("roleId") !== -1
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey("user", foreignKey);
    }
    await queryRunner.dropColumn("user", "roleId");
  }
}
