import {
  IsArray,
  IsDateString,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CaracteristicaProdutoDTO } from './CaracteristicaProduto.dto';
import { ImagemProdutoDTO } from './ImagemProduto.dto';
import { Type } from 'class-transformer';

export class CriaProdutoDTO {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuarioId: string;
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'Por favor digite um numero valido, não pode ter mais que duas casas decimais',
    },
  )
  @IsPositive({ message: 'O Valor do produto não pode ser negativo' })
  valor: number;

  @Min(0, { message: 'Quantidade não pode ser menor que zero' })
  @IsNumber(undefined, { message: 'Por favor digite um numero valido' })
  quantidadeDisponivel: number;

  @IsNotEmpty({ message: 'A descricao nao pode ser vazia' })
  @MaxLength(1000, {
    message: 'A descricao não pode passar de 1000 caracteres',
  })
  descricao: string;

  @ValidateNested()
  @IsArray({ message: 'Por favor informe valroes validos' })
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray({ message: 'Por favor informe valroes validos' })
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @IsNotEmpty({ message: 'A Mensagem nao pode ser vazia' })
  categoria: string;

  @IsDateString(undefined, { message: 'Informe uma data valida' })
  dataCriacao: string;

  @IsDateString(undefined, { message: 'Informe uma data valida' })
  dataAtualizacao: string;
}
