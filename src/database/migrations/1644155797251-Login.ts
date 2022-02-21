import {MigrationInterface, QueryRunner} from "typeorm";

export class Login1644155797251 implements MigrationInterface {
    name = 'Login1644155797251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "login" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT 'e62af0eb-6c41-43d2-a2d8-fce66086b6a2', "password:" character varying NOT NULL, "userId" uuid, "contactId" uuid NOT NULL, CONSTRAINT "REL_b1c3fff7c4bc7d15b3018abab6" UNIQUE ("userId"), CONSTRAINT "REL_5a81bce2346d33c0242ef11b5d" UNIQUE ("contactId"), CONSTRAINT "PK_0e29aa96b7d3fb812ff43fcfcd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_e7e34fa8e409e9146f4729fd0cb"`);

        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_e7e34fa8e409e9146f4729fd0cb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "login" ADD CONSTRAINT "FK_b1c3fff7c4bc7d15b3018abab6f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "login" ADD CONSTRAINT "FK_5a81bce2346d33c0242ef11b5d9" FOREIGN KEY ("contactId") REFERENCES "contact"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "login" DROP CONSTRAINT "FK_5a81bce2346d33c0242ef11b5d9"`);
        await queryRunner.query(`ALTER TABLE "login" DROP CONSTRAINT "FK_b1c3fff7c4bc7d15b3018abab6f"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_e7e34fa8e409e9146f4729fd0cb"`);
         await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_e7e34fa8e409e9146f4729fd0cb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`DROP TABLE "login"`);
    }

}
