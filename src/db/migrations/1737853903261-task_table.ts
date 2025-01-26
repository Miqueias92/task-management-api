import { MigrationInterface, QueryRunner } from 'typeorm';

export class TaskTable1737853903261 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`CREATE TABLE task (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      title varchar(100) NOT NULL,
      description varchar(200) NOT NULL,
      status varchar(50) NOT NULL DEFAULT 'TODO',
      expirantionDate TIMESTAMPTZ NOT NULL,
      CONSTRAINT pk_task_id PRIMARY KEY (id)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS task;`);
  }
}
