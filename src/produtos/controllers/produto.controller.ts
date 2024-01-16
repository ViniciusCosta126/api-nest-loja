import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CriaProdutoDTO } from '../dto/CriaProduto.dto';
import { AtualizaProdutoDTO } from '../dto/AtualizaProduto.dto';

import { ProdutoService } from '../services/produto.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('/produtos')
export class ProdutosController {
  constructor(private produtoService: ProdutoService) {}

  @Post()
  async criar(@Body() dadosProduto: CriaProdutoDTO) {
    const produtoCadastrado = this.produtoService.criaProduto(dadosProduto);
    return {
      mensagem: 'Produto criado com sucesso.',
      produto: produtoCadastrado,
    };
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async listar() {
    const produtos = await this.produtoService.listaProduto();
    return produtos;
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async listaPorId(@Param('id') id: string) {
    const produto = await this.produtoService.buscaPorId(id);

    return produto;
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizaProdutoDTO,
  ) {
    const produtoAlterado = await this.produtoService.atualizaProduto(
      id,
      dadosProduto,
    );

    return {
      mensagem: 'produto atualizado com sucesso',
      produto: produtoAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const produtoRemovido = await this.produtoService.removeProduto(id);
    return {
      mensagem: 'produto removido com sucesso',
      produto: produtoRemovido,
    };
  }
}
