import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CriaItensPedidoDTO {
  id: string;

  @IsInt({ message: 'Insira um numero valido, somente inteiros' })
  @IsNotEmpty({ message: 'O campo quantidade não pode ser vazio' })
  quantidade: number;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Insira um numero valido' })
  @IsNotEmpty({ message: 'O campo  precoVenda não pode ser vazio!' })
  precoVenda: number;
}
