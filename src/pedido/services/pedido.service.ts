import { Injectable } from '@nestjs/common';

import { UpdatePedidoDto } from '../dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from '../entities/pedido.entity';
import { FindRelationsNotFoundError, In, Repository } from 'typeorm';
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

  async cadastroPedido(usuarioId: string, dadosPedido: CriaPedidoDTO) {
    const usuario = await this.usarioRepository.findOneBy({ id: usuarioId });
    const produtosIds = dadosPedido.itensPedido.map((item) => item.produtoId);
    const produtosRelacionados = await this.produtoRepository.findBy({
      id: In(produtosIds),
    });
    const pedidoEntity = new PedidoEntity();

    const itensPedidosEntidades = dadosPedido.itensPedido.map((item) => {
      const itemPedidoEntity = new ItemPedidoEntity();
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === item.produtoId,
      );

      itemPedidoEntity.produto = produtoRelacionado;
      itemPedidoEntity.precoVenda = produtoRelacionado.valor;
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

    Object.assign(pedido, dto);

    return this.pedidoRepository.save(pedido);
  }
}
