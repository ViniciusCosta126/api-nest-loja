import { IsNotEmpty, IsUrl } from 'class-validator';

export class ImagemProdutoDTO {
  @IsUrl(undefined, { message: 'Url não pode ser vazia' })
  url: string;

  @IsNotEmpty({ message: 'Descricao nao pode ser vazia' })
  descricao: string;
}
