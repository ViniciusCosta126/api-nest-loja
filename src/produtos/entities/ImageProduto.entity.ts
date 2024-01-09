import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProdutoEntity } from './Produto.entity';

@Entity('produto_imagens')
export class ProdutoImagens {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'url', nullable: false })
  url: string;

  @Column({ name: 'descricao', nullable: false })
  descricao: string;

  @ManyToOne(() => ProdutoEntity, (produtoEntity) => produtoEntity.imagens, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  produto: ProdutoEntity;
}
