import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from '../entities/pedido.entity';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from '../../usuario/entities/usario.entity';
import { StatusPedido } from '../enum/statuspedido.enum';
import { CriaPedidoDTO } from '../dto/CriaPedido.dto';
import { ItemPedidoEntity } from '../entities/ItemPedido.entity';
import { ProdutoEntity } from '../../produtos/entities/Produto.entity';
import { AtualizaPedidoDto } from '../dto/AtualizaPedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,

    @InjectRepository(UsuarioEntity)
    private readonly usarioRepository: Repository<UsuarioEntity>,

    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  private async buscaUsuario(usuarioId: string) {
    const possivelUsuario = await this.usarioRepository.findOneBy({
      id: usuarioId,
    });

    if (!possivelUsuario) {
      throw new NotFoundException('Usuario não encontrado');
    }

    return possivelUsuario;
  }

  private trataDadosDoPedido(
    dadosDoPedido: CriaPedidoDTO,
    produtosRelacionados: ProdutoEntity[],
  ) {
    dadosDoPedido.itensPedido.forEach((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );

      if (produtoRelacionado === undefined) {
        throw new NotFoundException(
          `O produto com id ${itemPedido.produtoId} não foi encontrado`,
        );
      }

      if (itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel) {
        throw new BadRequestException(
          `A quantidade solicitada (${itemPedido.quantidade}) é maior do que a disponível (${produtoRelacionado.quantidadeDisponivel}) para o produto ${produtoRelacionado.nome}.`,
        );
      }
    });
  }

  async cadastroPedido(usuarioId: string, dadosPedido: CriaPedidoDTO) {
    const usuario = await this.buscaUsuario(usuarioId);

    const produtosIds = dadosPedido.itensPedido.map((item) => item.produtoId);
    const produtosRelacionados = await this.produtoRepository.findBy({
      id: In(produtosIds),
    });

    const pedidoEntity = new PedidoEntity();

    this.trataDadosDoPedido(dadosPedido, produtosRelacionados);

    const itensPedidosEntidades = dadosPedido.itensPedido.map((item) => {
      const itemPedidoEntity = new ItemPedidoEntity();
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === item.produtoId,
      );

      itemPedidoEntity.produto = produtoRelacionado!;
      itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
      itemPedidoEntity.quantidade = item.quantidade;
      itemPedidoEntity.produto.quantidadeDisponivel -= item.quantidade;
      return itemPedidoEntity;
    });

    const valorTotal = itensPedidosEntidades.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade;
    }, 0);

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;
    pedidoEntity.valorTotal = valorTotal;
    pedidoEntity.itensPedido = itensPedidosEntidades;

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);

    return pedidoCriado;
  }

  async listarPedidos(usuarioId: string) {
    return this.pedidoRepository.find({
      where: {
        usuario: { id: usuarioId },
      },
      relations: {
        usuario: true,
        itensPedido: true,
      },
    });
  }

  async atualizaPedido(id: string, dto: AtualizaPedidoDto) {
    const pedido = await this.pedidoRepository.findOneBy({ id });

    if (pedido === null) {
      throw new NotFoundException('Pedido não encontrado!');
    }
    Object.assign(pedido, dto);

    return this.pedidoRepository.save(pedido);
  }
}
