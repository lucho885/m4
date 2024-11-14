import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { Type } from "class-transformer";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";
import { Category } from "src/categories/categorie.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ProductService],
    controllers: [ProductsController],
    exports: [ProductService]
})
export class ProductsModule{}