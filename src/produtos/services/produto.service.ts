import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProdutoEntity } from '../entities/Produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AtualizaProdutoDTO } from '../dto/AtualizaProduto.dto';
import { CriaProdutoDTO } from '../dto/CriaProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(dadosProduto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();

    Object.assign(produtoEntity, dadosProduto as ProdutoEntity);

    return this.produtoRepository.save(produtoEntity);
  }

  async listaProduto() {
    const produtosSalvos = await this.produtoRepository.find();
    return produtosSalvos;
  }

  async buscaPorId(id: string) {
    const possivelProduto = await this.produtoRepository.findOneBy({ id: id });

    if (!possivelProduto) {
      throw new NotFoundException('produto não foi encontrado!');
    }

    return possivelProduto;
  }

  async atualizaProduto(id: string, dados: AtualizaProdutoDTO) {
    const produto = await this.buscaPorId(id);

    Object.assign(produto, dados as ProdutoEntity);
    return this.produtoRepository.save(produto);
  }

  async removeProduto(id: string) {
    const produto = await this.buscaPorId(id);
    if (produto) {
      await this.produtoRepository.delete(id);
    }
  }
}
