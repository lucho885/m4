import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsUrl, IsEmail } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class Auth {
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  id: number;

  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Exclude()
  password: string;
}