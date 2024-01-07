import { IsNotEmpty } from 'class-validator';

export class CaracteristicaProdutoDTO {
  @IsNotEmpty({ message: 'Caracteristica nao pode ser vazia' })
  nome: string;

  @IsNotEmpty({ message: 'Descricao nao pode ser vazia' })
  descricao: string;
}
