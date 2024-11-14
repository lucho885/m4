import { Min } from "class-validator";

export class UpdateProductDto {
    @Min(0)  // Verifica que sea un número positivo o cero
    stock: number;
}