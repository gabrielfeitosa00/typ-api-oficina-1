import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class StudentTable1629590086815 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "student",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "ra",
            type: "int",
            isUnique: true,
          },
          {
            name: "phone",
            type: "varchar(45)",
            isNullable: true,
            isUnique: true,
            default: null,
          },
          {
            name: "coefficient",
            type: "decimal(8,2)",

            default: 0,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("student");
  }
}
