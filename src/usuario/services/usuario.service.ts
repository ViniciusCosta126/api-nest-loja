import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from '../dto/ListaUsuario.dto';
import { UsuarioEntity } from '../entities/usario.entity';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from '../dto/AtualizaUsuario.dto';
import { CriaUsuarioDto } from '../dto/CriaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criaUsuario(dadosDoUsuario: CriaUsuarioDto) {
    const usuarioEntity = new UsuarioEntity();

    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.nome = dadosDoUsuario.nome;
    return this.usuarioRepository.save(usuarioEntity);
  }

  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuariosLista = usuariosSalvos.map(
      (usuarioSalvo) => new ListaUsuarioDTO(usuarioSalvo.id, usuarioSalvo.nome),
    );
    return usuariosLista;
  }

  async atualizaUsuario(id: string, ususarioEntity: AtualizaUsuarioDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id: id });

    if (usuario === null) {
      throw new NotFoundException('Usuario não encontrado');
    }

    await this.usuarioRepository.update(id, ususarioEntity);
  }

  async deletaUsuario(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id: id });

    if (usuario === null) {
      throw new NotFoundException('Usuario não encontrado');
    }

    await this.usuarioRepository.delete(id);
  }
}
