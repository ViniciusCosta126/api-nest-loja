import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { PedidoService } from '../services/pedido.service';

import { UpdatePedidoDto } from '../dto/update-pedido.dto';
import { CriaPedidoDTO } from '../dto/CriaPedido.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async create(
    @Query('usuarioId') usuarioId: string,
    @Body() dadosPedido: CriaPedidoDTO,
  ) {
    const pedidoCriado = await this.pedidoService.cadastroPedido(
      usuarioId,
      dadosPedido,
    );

    return pedidoCriado;
  }

  @Get()
  async listarPedidos(@Query('usuarioId') usuarioId: string) {
    const pedidos = this.pedidoService.listarPedidos(usuarioId);

    return pedidos;
  }
}
