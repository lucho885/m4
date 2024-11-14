import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/categories/categorie.entity";
import { Product } from "src/products/product.entity";
import { CategoriesSeed } from "./categories/categories.seed";
import { ProductsSeed } from "./products/products.seed";

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Product]), 
      ],
    providers: [CategoriesSeed, ProductsSeed], 
    exports: [CategoriesSeed, ProductsSeed],
})
export class SeedsModule{}