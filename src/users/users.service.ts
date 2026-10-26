
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto.js'
import { UpdateUserDto } from './dto/update-user.dto.js'
import { UsersRepository } from './repositories/users.repository.js'
import { NotFoundError } from '../common/errors/types/NotFoundError.js'

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository) {}
  
  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto)
  }

  async findAll() {
    return await this.usersRepository.findAll()
  }

  async findOne(id: number): Promise<any> {
    const user = await this.usersRepository.findOne(id)
    if(!user) {
      throw new NotFoundError(`User not found with id ${id}`)
    }

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id)
    if(!user) {
      throw new NotFoundError(`User not found with id ${id}`)
    }
    
    return this.usersRepository.update(id, updateUserDto)
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne(id)
    if(!user) {
      throw new NotFoundError(`User not found with id ${id}`)
    }
    
    await this.usersRepository.delete(id)
  }

}
