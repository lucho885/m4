import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsUrl } from 'class-validator';
import { Expose } from 'class-transformer';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  descripcion: string;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  stock: number;

  @IsUrl()
  @Expose()
  imgUrl: string;
}