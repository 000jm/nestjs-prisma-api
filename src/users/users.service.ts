
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto.js'
import { UpdateUserDto } from './dto/update-user.dto.js'
import { UsersRepository } from './repositories/users.repository.js'

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository) {}
  
  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto)
  }

  findAll() {
    return this.usersRepository.findAll()
  }

  findOne(id: number): any {
    return this.usersRepository.findOne(id)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.usersRepository.delete(id)
  }

}
