import { IsUUID, IsArray, ArrayMinSize, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsUUID()  // Valida que el userId sea un UUID
  @IsNotEmpty()  // Valida que el campo no esté vacío
  userId: string;

  @IsArray()  
  @ArrayMinSize(1)  
  @ValidateNested({ each: true })  // Valida que cada elemento del array sea un objeto validado
  @Type(() => PartialProductEntityDto)  // Define el tipo de cada elemento como PartialProductEntityDto
  products: PartialProductEntityDto[];
}


export class PartialProductEntityDto {
  @IsUUID()  
  @IsNotEmpty()  
  id: string;
}
