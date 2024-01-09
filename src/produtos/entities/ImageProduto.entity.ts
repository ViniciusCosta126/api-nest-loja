import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('produto_imagens')
export class ProdutoImagens {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'url', nullable: false })
  url: string;

  @Column({ name: 'descricao', nullable: false })
  descricao: string;
}
