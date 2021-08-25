import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class DisiplineTable1629849924949 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "disipline",
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
            type: "varchar(60)",
            isUnique: true,
          },
          {
            name: "code",
            type: "varchar(45)",
            isUnique: true,
          },
          {
            name: "description",
            type: "text(500)",
          },
          {
            name: "number_of_classes",
            type: "int",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("disipline");
  }
}
