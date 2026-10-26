
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
    return `This action returns all users`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }

}
