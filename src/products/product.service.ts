import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { QueryRunner, Repository } from "typeorm";
import { ProductDto } from "./product.dto";
import {UpdateProductDto} from "./updateProduct.dto"

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productsRepository : Repository<Product>) {}

  async createProductService(data: ProductDto): Promise<string> {
    // Crear una nueva instancia del producto usando el DTO
    const newProduct = this.productsRepository.create(data);

    // Guardar el producto en la base de datos
    const savedProduct = await this.productsRepository.save(newProduct);

    // Retornar el ID del nuevo producto
    return newProduct.id;
  }

  async update(id:string,updateProduct: UpdateProductDto) {
     await this.productsRepository.update(id,updateProduct);
     return  await this.getProductByIdService(id);
  }

  async buyProduct(id: string, queryRunner: QueryRunner): Promise<number> {
    const product = await queryRunner.manager.findOne(Product, { where: { id } });
    if(!product) { 
      throw new Error("el producto no existe")} 
    if(product.stock===0) {
      throw new Error("Out of stock")}
   
        // Actualizar el stock del producto dentro de la transacción
        await queryRunner.manager.update(Product, id, { stock: product.stock - 1 });
    
        return product.price;
    }

  async getProductByIdService(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return product;
  }

  async deleteProductService(id: string): Promise<string> {
    const result = await this.productsRepository.delete(id);
    
    if (result.affected === 0) {
        throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return "producto eliminado"
}

  async getProductsService(page: number, limit: number): Promise<Product[]> {
    const startIndex = (page - 1) * limit;

    // Usar el repositorio de productos para obtener los productos paginados
    return await this.productsRepository.find({
      skip: startIndex,
      take: limit,
    });
  }

  async updateImageUrl(id: string, imgUrl: string): Promise<Product> {
    const product = await this.getProductByIdService(id);
    product.imgUrl = imgUrl; // Actualiza la URL de la imagen

    // Guarda los cambios en el repositorio
    await this.productsRepository.save(product);
    return product; // Devuelve el producto actualizado
}
}