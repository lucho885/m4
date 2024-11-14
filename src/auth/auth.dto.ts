import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsUrl, IsEmail } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class AuthDto {
    
  @IsString()
  @IsNotEmpty()
  @Expose()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;
}