import { Module } from '@nestjs/common';
import { PedidoService } from './services/pedido.service';
import { PedidoController } from './controllers/pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './entities/pedido.entity';
import { UsuarioEntity } from '../usuario/entities/usario.entity';
import { ProdutoEntity } from 'src/produtos/entities/Produto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PedidoEntity, UsuarioEntity, ProdutoEntity]),
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
