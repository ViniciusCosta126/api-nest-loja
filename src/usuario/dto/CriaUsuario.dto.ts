import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CriaUsuarioDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsEmail(undefined, { message: 'Email invalido ou vazio' })
  email: string;

  @MinLength(6, { message: 'A senha deve ter no minimo 6 caracteres' })
  senha: string;
}
