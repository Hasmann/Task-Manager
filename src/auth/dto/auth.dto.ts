import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class signUpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}
