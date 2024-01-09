import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriaUsuarioDto } from '../dto/CriaUsuario.dto';
import { UsuarioEntity } from '../entities/usario.entity';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from '../dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from '../dto/AtualizaUsuario.dto';
import { UsuarioService } from '../services/usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usarioService: UsuarioService) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDto) {
    const usuarioEntity = new UsuarioEntity();
    Object.entries(dadosDoUsuario).forEach(([chave, valor]) => {
      usuarioEntity[chave] = valor;
    });
    usuarioEntity.id = uuid();

    this.usarioService.criaUsuario(usuarioEntity);

    return {
      message: 'Usuario criado com sucesso!',
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
    };
  }

  @Get()
  async listarUsuarios() {
    const usuariosSalvos = await this.usarioService.listaUsuarios();
    return usuariosSalvos;
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usarioService.atualizaUsuario(
      id,
      novosDados,
    );

    return {
      message: 'usuario atualizado com sucesso',
      usuario: usuarioAtualizado,
    };
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usarioService.deletaUsuario(id);
    return {
      usuario: usuarioRemovido,
      message: 'Usuario removido com sucesso',
    };
  }
}
