import { Module } from '@nestjs/common';
import { ProdutosController } from './controllers/produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoEntity } from './entities/Produto.entity';
import { ProdutoService } from './services/produto.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity])],
  controllers: [ProdutosController],
  providers: [ProdutoService],
})
export class ProdutoModule {}
