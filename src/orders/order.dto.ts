import { IsArray, IsString } from "class-validator";
import { Product } from "src/products/product.entity";

export interface ProductId {
    id: string;
}


export class createeOrderDto {
    @IsString()
    userId: string;

    @IsArray()
    products: Array<ProductId>;
}