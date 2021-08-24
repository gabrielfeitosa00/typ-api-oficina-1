import { MigrationInterface, QueryRunner } from "typeorm";
import { Course } from "../../models";
import { CourseSeed } from "../seeds";

export class courseSeed1629764888135 implements MigrationInterface {
  public async up(_queryRunner: QueryRunner): Promise<void> {
    const newCoures = Course.create(CourseSeed);
    await Course.save(newCoures);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`delete from typ.course`);
  }
}
