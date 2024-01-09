import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('produto_caracteristicas')
export class ProdutoCaracteristica {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'descricao', nullable: false })
  descricao: string;
}
