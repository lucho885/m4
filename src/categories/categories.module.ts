import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./categorie.entity"
import { Product } from "src/products/product.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Category]), // Esto es necesario para registrar el repositorio
                                         //  y creo que depsues tengo que poner las entidades que usa el //modulo user
      ],
    providers: [CategoriesService],
    controllers: [CategoriesController],
})
export class CategoriesModule{}