import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProdutoRepository } from '../repositories/produtos.repository';
import { CriaProdutoDTO } from '../dto/CriaProduto.dto';

@Controller('/produtos')
export class ProdutosController {
  constructor(private produtoRepository: ProdutoRepository) {}

  @Post()
  async criar(@Body() dadosProduto: CriaProdutoDTO) {
    this.produtoRepository.salvar(dadosProduto);
  }

  @Get()
  async listar() {
    return this.produtoRepository.listar();
  }
}
