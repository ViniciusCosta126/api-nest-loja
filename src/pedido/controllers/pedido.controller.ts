import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PedidoService } from '../services/pedido.service';
import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { UpdatePedidoDto } from '../dto/update-pedido.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async create(@Param('usuarioId') usuarioId: string) {
    const pedidoCriado = await this.pedidoService.cadastroPedido(usuarioId);

    return pedidoCriado;
  }

  @Get()
  async listarPedidos(@Param('usuarioId') usuarioId: string) {
    const pedidos = this.pedidoService.listarPedidos(usuarioId);

    return pedidos;
  }
}
