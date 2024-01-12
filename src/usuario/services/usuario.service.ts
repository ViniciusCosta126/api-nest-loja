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

    Object.assign(usuarioEntity, dadosDoUsuario as UsuarioEntity);

    return this.usuarioRepository.save(usuarioEntity);
  }

  async buscaPorEmail(email: string) {
    const checkEmail = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (checkEmail === null)
      throw new NotFoundException('O email não foi encontrado.');

    return checkEmail;
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

    Object.assign(usuario, ususarioEntity as UsuarioEntity);

    await this.usuarioRepository.save(usuario);
  }

  async deletaUsuario(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id: id });

    if (usuario === null) {
      throw new NotFoundException('Usuario não encontrado');
    }

    await this.usuarioRepository.delete(id);
  }
}
