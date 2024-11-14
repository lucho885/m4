import { IsUUID, IsArray, ArrayMinSize, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class LoginUserDto {
  @IsUUID()  // Valida que el userId sea un UUID
  @IsNotEmpty()  // Valida que el campo no esté vacío
  userId: string;

}