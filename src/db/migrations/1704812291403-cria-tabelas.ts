import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaTabelas1704812291403 implements MigrationInterface {
    name = 'CriaTabelas1704812291403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "ususario_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" ADD "ususario_id" character varying NOT NULL`);
    }

}
