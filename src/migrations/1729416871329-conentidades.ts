import { MigrationInterface, QueryRunner } from "typeorm";

export class Conentidades1729416871329 implements MigrationInterface {
    name = 'Conentidades1729416871329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "descripcion" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying DEFAULT 'https://example.com/default-image.png', "categoryId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ordersDetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_d1fff5666a3601a3a7a786a3cd9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT now(), "orderDetailsId" uuid, "userId" uuid, CONSTRAINT "REL_cb8486eaad7a292ff78b37d761" UNIQUE ("orderDetailsId"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying NOT NULL, "address" text, "phone" text, "country" character varying(50), "city" character varying(50), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_order_details_orders_details" ("productsId" uuid NOT NULL, "ordersDetailsId" uuid NOT NULL, CONSTRAINT "PK_e99100da90ce16023a94915e693" PRIMARY KEY ("productsId", "ordersDetailsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_24020d78581c03248da99c5fca" ON "products_order_details_orders_details" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_771d7c5a3cee9e60d8e7146d96" ON "products_order_details_orders_details" ("ordersDetailsId") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cb8486eaad7a292ff78b37d7610" FOREIGN KEY ("orderDetailsId") REFERENCES "ordersDetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_order_details_orders_details" ADD CONSTRAINT "FK_24020d78581c03248da99c5fcaf" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_order_details_orders_details" ADD CONSTRAINT "FK_771d7c5a3cee9e60d8e7146d965" FOREIGN KEY ("ordersDetailsId") REFERENCES "ordersDetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_order_details_orders_details" DROP CONSTRAINT "FK_771d7c5a3cee9e60d8e7146d965"`);
        await queryRunner.query(`ALTER TABLE "products_order_details_orders_details" DROP CONSTRAINT "FK_24020d78581c03248da99c5fcaf"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cb8486eaad7a292ff78b37d7610"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_771d7c5a3cee9e60d8e7146d96"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_24020d78581c03248da99c5fca"`);
        await queryRunner.query(`DROP TABLE "products_order_details_orders_details"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "ordersDetails"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
