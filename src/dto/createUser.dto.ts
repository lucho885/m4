import { IsString, Length, IsNotEmpty, IsEmail, Matches, IsNumberString } from 'class-validator';

export class CreateUserDto {
  
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  name: string;

  @IsEmail() // Valida que sea un correo electrónico válido
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
  //   message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*), and be between 8 to 15 characters long',
  // })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  address: string;

  @IsNumberString() // Valida que sea un número
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  // @Length(5, 20)
  country: string;

  @IsString()
  @IsNotEmpty()
  // @Length(5, 20)
  city: string;
}
