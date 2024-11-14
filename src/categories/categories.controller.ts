// getCategories y addCategories.

import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { Category } from "./categorie.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Categories")
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
    
  // Método para obtener todas las categorías
  @Get()
  async getCategories() {
    return this.categoriesService.getCategories();
  }

  // Método para añadir nuevas categorías
  @Post('seeder')
  async addCategories(@Body() categories: Category[]) {
    return this.categoriesService.addCategories(categories);
  }

}