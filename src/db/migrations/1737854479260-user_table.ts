import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1737854479260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user" (
          id uuid NOT NULL DEFAULT uuid_generate_v4(),
          username varchar(100) NOT NULL,
          password varchar(200) NOT NULL,
          CONSTRAINT pk_user_id PRIMARY KEY (id),
          CONSTRAINT uq_user_username UNIQUE (username)
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user;`);
  }
}
