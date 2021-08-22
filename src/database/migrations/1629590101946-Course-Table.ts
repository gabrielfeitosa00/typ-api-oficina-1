import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CourseTable1629590101946 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "course",
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
            type: "varchar(45)",
          },
          {
            name: "description",
            type: "varchar(45)",
          },
          {
            name: "shift",
            type: "varchar(45)",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("course");
  }
}
