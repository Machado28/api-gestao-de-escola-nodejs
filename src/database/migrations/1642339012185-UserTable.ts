import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTable1642339012185 implements MigrationInterface {
    name = 'UserTable1642339012185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL DEFAULT 'usuário do portal das escolas', "genero" character varying NOT NULL DEFAULT 'masculino', "numeroDeDocumento" character varying, "dataDeNascimento" date NOT NULL DEFAULT '2000-12-02', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
