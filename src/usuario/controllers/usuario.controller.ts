import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { CriaUsuarioDto } from '../dto/CriaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDto) {
    this.usuarioRepository.salvar(dadosDoUsuario);
    return dadosDoUsuario;
  }

  @Get()
  async listarUsuarios() {
    return this.usuarioRepository.listar();
  }
}
