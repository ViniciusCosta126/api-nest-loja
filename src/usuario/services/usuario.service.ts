import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from '../dto/ListaUsuario.dto';
import { UsuarioEntity } from '../entities/usario.entity';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from '../dto/AtualizaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criaUsuario(usuarioEntity: UsuarioEntity) {
    await this.usuarioRepository.save(usuarioEntity);
  }

  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuariosLista = usuariosSalvos.map(
      (usuarioSalvo) => new ListaUsuarioDTO(usuarioSalvo.id, usuarioSalvo.nome),
    );
    return usuariosLista;
  }

  async atualizaUsuario(id: string, ususarioEntity: AtualizaUsuarioDTO) {
    await this.usuarioRepository.update(id, ususarioEntity);
  }

  async deletaUsuario(id: string) {
    await this.usuarioRepository.delete(id);
  }
}
