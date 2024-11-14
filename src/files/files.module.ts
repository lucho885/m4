import { Module } from "@nestjs/common";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/products/product.entity";
import { ProductsModule } from "src/products/products.module";
import { CloudinaryConfig } from "src/config/cloudinary";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),ProductsModule,
      ],
    providers: [FilesService, CloudinaryConfig],
    controllers: [FilesController]
})
export class FilesModule{}