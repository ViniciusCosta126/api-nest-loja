import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produtos/produtos.module';

@Module({
  imports: [UsuarioModule, ProdutoModule],
})
export class AppModule {}
