import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entities/usario.entity';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private configSerivce: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configSerivce.get<string>('DB_HOST'),
      port: this.configSerivce.get<number>('DB_PORT'),
      username: this.configSerivce.get<string>('DB_USERNAME'),
      password: this.configSerivce.get<string>('DB_PASSWORD'),
      database: this.configSerivce.get<string>('DB_NAME'),
      entities: [__dirname + '/../**/*.entity{.js,.ts}'],
    };
  }
}
