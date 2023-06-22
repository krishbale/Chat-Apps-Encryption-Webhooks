import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateNameTable1687407965454 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" RENAME COLUMN "name" TO "title"`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" RENAME COLUMN "title" TO "name"`,
        )
    }

}
