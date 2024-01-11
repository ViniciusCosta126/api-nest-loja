import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProdutoCaracteristica } from './CaracteristicaProduto.entity';
import { ProdutoImagens } from './ImageProduto.entity';
import { ItemPedidoEntity } from '../../pedido/entities/ItemPedido.entity';

@Entity({ name: 'produtos' })
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'valor', nullable: false, type: 'real' })
  valor: number;

  @Column({ name: 'quantidade_disponivel', nullable: false })
  quantidadeDisponivel: number;

  @Column({ name: 'descricao', nullable: false })
  descricao: string;

  @OneToMany(
    () => ProdutoCaracteristica,
    (produtoCaracteristica) => produtoCaracteristica.produto,
    { cascade: true, eager: true },
  )
  caracteristicas: ProdutoCaracteristica[];

  @OneToMany(() => ProdutoImagens, (produtoImagem) => produtoImagem.produto, {
    cascade: true,
    eager: true,
  })
  imagens: ProdutoImagens[];

  @Column({ name: 'categoria', nullable: false })
  categoria: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(() => ItemPedidoEntity, (itemPedido) => itemPedido.produto)
  itensPedido: ItemPedidoEntity[];
}
