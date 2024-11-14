import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/categories/categorie.entity";
import { In, Repository } from "typeorm";
import { Product } from "src/products/product.entity";
import { productsMock } from "./products-mock";

@Injectable()
export class ProductsSeed {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>,
                @InjectRepository(Category) private readonly categoryRepositoy: Repository<Category>) {}

async findCategoryByName(category: string) {
  const foundCategory = await this.categoryRepositoy.findOne({where: {name: category}});

  if(!foundCategory) {
    throw new Error(`Category ${category} not found`)
  }
  return foundCategory
}                

async seed() {
    //Obtener todos los nombres de los productos existentes de una vez
    const existingProductsName = (await this.productRepository.find()).map((product) => product.name);

    //usar for  of para asegurar la ejecución secuencial de las operaciones asincronicas
    for(const productData of productsMock) {
        //verificar si el producto actual existe en el conjunto de resultados
        if(!existingProductsName.includes(productData.name)) {
            const product = new Product();
            product.name = productData.name;
            product.descripcion = productData.description;
            product.price = productData.price;
            product.stock = productData.stock;
            product.category = await this.findCategoryByName(productData.category);
            await this.productRepository.save(product)
     
        }
    }
}
}