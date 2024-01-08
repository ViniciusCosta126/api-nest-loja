import { CaracteristicaProdutoEntity } from './CaracteristicaProduto.entity';
import { ImagemProdutoEntity } from './ImageProduto.entity';

export class ProdutoEntity {
  id: string;
  usuarioId: string;
  nome: string;
  valor: number;
  quantidadeDisponivel: number;
  descricao: string;
  caracteristicas: CaracteristicaProdutoEntity[];
  imagens: ImagemProdutoEntity[];
  categoria: string;
  dataCriacao: string;
  dataAtualizacao: string;
}
