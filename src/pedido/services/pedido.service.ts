import { Injectable } from '@nestjs/common';

import { UpdatePedidoDto } from '../dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from '../entities/pedido.entity';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../../usuario/entities/usario.entity';
import { StatusPedido } from '../enum/statuspedido.enum';
import { CriaPedidoDTO } from '../dto/CriaPedido.dto';
import { ItemPedidoEntity } from '../entities/ItemPedido.entity';
import { reduce } from 'rxjs';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,

    @InjectRepository(UsuarioEntity)
    private readonly usarioRepository: Repository<UsuarioEntity>,
  ) {}

  async cadastroPedido(usuarioId: string, dadosPedido: CriaPedidoDTO) {
    const usuario = await this.usarioRepository.findOneBy({ id: usuarioId });
    const pedidoEntity = new PedidoEntity();

    const itensPedidosEntidades = dadosPedido.itensPedido.map((item) => {
      const itemPedidoEntity = new ItemPedidoEntity();
      itemPedidoEntity.precoVenda = 10;
      itemPedidoEntity.quantidade = item.quantidade;
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
}
