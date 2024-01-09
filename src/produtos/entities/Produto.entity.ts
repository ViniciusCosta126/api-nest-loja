import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProdutoCaracteristica } from './CaracteristicaProduto.entity';
import { ProdutoImagens } from './ImageProduto.entity';

@Entity({ name: 'produtos' })
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'ususario_id', nullable: false })
  usuarioId: string;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'valor', nullable: false })
  valor: number;

  @Column({ name: 'quantidade_disponivel', nullable: false })
  quantidadeDisponivel: number;

  @Column({ name: 'descricao', nullable: false })
  descricao: string;

  //caracteristicas: ProdutoCaracteristica[];
  //imagens: ProdutoImagens[];

  @Column({ name: 'categoria', nullable: false })
  categoria: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
