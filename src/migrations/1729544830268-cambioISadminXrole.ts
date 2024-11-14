import { MigrationInterface, QueryRunner } from "typeorm";

export class CambioISadminXrole1729544830268 implements MigrationInterface {
    name = 'CambioISadminXrole1729544830268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
    }

}
