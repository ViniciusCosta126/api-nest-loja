import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PedidoEntity } from './pedido.entity';

@Entity({ name: 'itens_pedido' })
export class ItemPedidoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;

  @Column({ name: 'preco_venda', nullable: false, type: 'real' })
  precoVenda: number;

  @ManyToOne(() => PedidoEntity, (pedido) => pedido.itensPedido, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  pedido: PedidoEntity;
}
