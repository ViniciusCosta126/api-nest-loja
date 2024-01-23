import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './controllers/usuario.controller';
import { EmailEhUnicoValidator } from './validacao/email-unico.validator';
import { UsuarioService } from './services/usuario.service';
import { UsuarioEntity } from './entities/usario.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuarioController],
  providers: [UsuarioService, EmailEhUnicoValidator],
  exports: [UsuarioService],
})
export class UsuarioModule {}
