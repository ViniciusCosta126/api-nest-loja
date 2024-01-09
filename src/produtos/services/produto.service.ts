import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProdutoEntity } from '../entities/Produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AtualizaProdutoDTO } from '../dto/AtualizaProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(produtoEntity: ProdutoEntity) {
    await this.produtoRepository.save(produtoEntity);
  }

  async listaProduto() {
    const produtosSalvos = await this.produtoRepository.find();
    return produtosSalvos;
  }

  private async buscaPorId(id: string) {
    const possivelProduto = await this.produtoRepository.findOneBy({ id: id });
    if (!possivelProduto) {
      throw new Error('Produto não encontrado');
    }
    return possivelProduto;
  }
  async atualizaProduto(id: string, dados: AtualizaProdutoDTO) {
    const produto = await this.buscaPorId(id);
    if (produto) {
      await this.produtoRepository.update(id, dados);
    }
  }

  async removeProduto(id: string) {
    const produto = await this.buscaPorId(id);
    if (produto) {
      await this.produtoRepository.delete(id);
    }
  }
}
