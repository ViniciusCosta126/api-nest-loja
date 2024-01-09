import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutoRepository } from '../repositories/produtos.repository';
import { CriaProdutoDTO } from '../dto/CriaProduto.dto';
import { ProdutoEntity } from '../entities/Produto.entity';
import { AtualizaProdutoDTO } from '../dto/AtualizaProduto.dto';
import { randomUUID } from 'crypto';
import { ProdutoService } from '../services/produto.service';

@Controller('/produtos')
export class ProdutosController {
  constructor(
    private produtoService: ProdutoService,
    private produtoRepository: ProdutoRepository,
  ) {}

  @Post()
  async criar(@Body() dadosProduto: CriaProdutoDTO) {
    const produtoCadastrado = this.produtoService.criaProduto(dadosProduto);
    return {
      mensagem: 'Produto criado com sucesso.',
      produto: produtoCadastrado,
    };
  }

  @Get()
  async listar() {
    const produtos = await this.produtoService.listaProduto();
    return produtos;
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
