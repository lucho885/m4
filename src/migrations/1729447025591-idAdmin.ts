import { MigrationInterface, QueryRunner } from "typeorm";

export class IdAdmin1729447025591 implements MigrationInterface {
    name = 'IdAdmin1729447025591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
    }

}
