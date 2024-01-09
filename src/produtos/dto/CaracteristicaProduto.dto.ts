import { IsNotEmpty } from 'class-validator';
import { ProdutoEntity } from '../entities/Produto.entity';

export class CaracteristicaProdutoDTO {
  id: string;

  @IsNotEmpty({ message: 'Caracteristica nao pode ser vazia' })
  nome: string;

  @IsNotEmpty({ message: 'Descricao nao pode ser vazia' })
  descricao: string;

  produto: ProdutoEntity;
}
