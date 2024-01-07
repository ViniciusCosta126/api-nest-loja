import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-unico.validator';

export class CriaUsuarioDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsEmail(undefined, { message: 'Email invalido ou vazio' })
  @EmailEhUnico({ message: 'Ja existe um usuario cadastrado om este email' })
  email: string;

  @MinLength(6, { message: 'A senha deve ter no minimo 6 caracteres' })
  senha: string;
}
