import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-unico.validator';

export class AtualizaUsuarioDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsOptional()
  nome: string;

  @IsEmail(undefined, { message: 'Email invalido ou vazio' })
  @EmailEhUnico({ message: 'Ja existe um usuario cadastrado om este email' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha deve ter no minimo 6 caracteres' })
  @IsOptional()
  senha: string;
}
