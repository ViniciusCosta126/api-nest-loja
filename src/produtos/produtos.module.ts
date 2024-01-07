import { Module } from '@nestjs/common';
import { ProdutoRepository } from './repositories/produtos.repository';
import { ProdutosController } from './controllers/produto.controller';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutoRepository],
})
export class ProdutoModule {}
