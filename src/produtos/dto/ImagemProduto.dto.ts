import { IsNotEmpty, IsUrl } from 'class-validator';
import { ProdutoEntity } from '../entities/Produto.entity';

export class ImagemProdutoDTO {
  id: string;

  @IsUrl(undefined, { message: 'Url não pode ser vazia' })
  url: string;

  @IsNotEmpty({ message: 'Descricao nao pode ser vazia' })
  descricao: string;

  produto: ProdutoEntity;
}
