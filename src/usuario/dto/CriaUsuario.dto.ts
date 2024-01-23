import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EmailEhUnico } from '../validacao/email-unico.validator';

export class CriaUsuarioDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsEmail(undefined, { message: 'Email invalido ou vazio' })
  @EmailEhUnico({ message: 'Ja existe um usuario cadastrado om este email' })
  email: string;

  @MinLength(8, { message: 'A senha deve ter no minimo 8 caracteres' })
  @MaxLength(30, { message: 'A senha deve ter no maximo 30 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+).{6,30}$/, {
    message:
      'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres',
  })
  senha: string;
}
