import { Module } from '@nestjs/common';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioRepository } from './repositories/usuario.repository';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioRepository],
})
export class UsuarioModule {}
