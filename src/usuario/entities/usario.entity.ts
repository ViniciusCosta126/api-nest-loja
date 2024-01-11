import { PedidoEntity } from '../../pedido/entities/pedido.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', type: 'text', nullable: false })
  nome: string;

  @Column({ name: 'email', type: 'text', nullable: false })
  email: string;

  @Column({ name: 'senha', type: 'text', nullable: false })
  senha: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(() => PedidoEntity, (pedido) => pedido.usuario)
  pedidos: PedidoEntity[];
}
