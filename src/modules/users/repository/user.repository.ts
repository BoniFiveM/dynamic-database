import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/users';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
    console.log('UserRepository initialized'); // Log para verificar a inicialização
  }

  // Atualize o método defaultSelect
  defaultSelect(): Record<string, boolean> {
    return {
      id: true,
      name: true,
      active: true,
    }; // Seleção compatível com FindOptionsSelect
  }

  // Atualize o uso em findTeste
  async findTeste() {
    const fields = this.defaultSelect();
    console.log('findTeste called, selecting fields:', fields);

    const users = await this.find({
      select: fields, // Agora é compatível
    });

    console.log('findTeste completed, returning users:', users);
    return users;
  }
}
