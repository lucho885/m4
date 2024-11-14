import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductDto } from "./product.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { ProductService } from "./product.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Products")
@Controller("products")
export class ProductsController {
    constructor(private readonly productService: ProductService
    ) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    creteProductController(@Body() data : ProductDto){
        return this.productService.createProductService(data)
    }
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete(':id') // Ruta para eliminar un producto específico por su ID
    deleteProductController(@Param('id') id: string) {
      return this.productService.deleteProductService(id);
    }

    @Get()
    getProducts(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
    ) {
      return this.productService.getProductsService(page, limit);
    }
    
    
    // @UseGuards(AuthGuard)
    @Get(":id") //siempre dejarlo como ultimo enpoint para que no entre en endpoints incorrectos
    getProductByIdController(@Param("id") id : string) {
       return this.productService.getProductByIdService(id)
    }
}