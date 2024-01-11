import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { UpdatePedidoDto } from '../dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from '../entities/pedido.entity';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../../usuario/entities/usario.entity';
import { StatusPedido } from '../enum/statuspedido.enum';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepositroy: Repository<PedidoEntity>,

    @InjectRepository(UsuarioEntity)
    private readonly usarioRepository: Repository<UsuarioEntity>,
  ) {}

  async cadastroPedido(usuarioId: string) {
    const usuario = await this.usarioRepository.findOneBy({ id: usuarioId });
    const pedidoEntity = new PedidoEntity();

    pedidoEntity.valorTotal = 0;
    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;

    const pedidoCriado = await this.pedidoRepositroy.save(pedidoEntity);

    return pedidoCriado;
  }

  async listarPedidos(usuarioId: string) {
    const pedidos = await this.pedidoRepositroy.find({
      where: { id: usuarioId },
      relations: { usuario: true },
    });

    return pedidos;
  }
}
