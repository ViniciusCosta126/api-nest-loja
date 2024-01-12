import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private readonly usuarioService: UsuarioService,
  ) {}

  // email-eh-unico.validator.ts

  async validate(value: any): Promise<boolean> {
    try {
      const usuarioComEmailExiste =
        await this.usuarioService.buscaPorEmail(value);

      return !usuarioComEmailExiste;
    } catch (erro) {
      if (erro instanceof NotFoundException) {
        return true;
      }

      throw erro;
    }
  }
}

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: Object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailEhUnicoValidator,
    });
  };
};
