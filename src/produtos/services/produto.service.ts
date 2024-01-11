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

    produtoEntity.nome = dadosProduto.nome;
    produtoEntity.valor = dadosProduto.valor;
    produtoEntity.quantidadeDisponivel = dadosProduto.quantidadeDisponivel;
    produtoEntity.descricao = dadosProduto.descricao;
    produtoEntity.categoria = dadosProduto.categoria;
    produtoEntity.caracteristicas = dadosProduto.caracteristicas;
    produtoEntity.imagens = dadosProduto.imagens;

    return this.produtoRepository.save(produtoEntity);
  }

  async listaProduto() {
    const produtosSalvos = await this.produtoRepository.find();
    return produtosSalvos;
  }

  private async buscaPorId(id: string) {
    const possivelProduto = await this.produtoRepository.findOneBy({ id: id });

    if (!possivelProduto) {
      throw new NotFoundException('produto não foi encontrado!');
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
