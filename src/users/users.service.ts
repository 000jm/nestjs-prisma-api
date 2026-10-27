
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto.js'
import { UpdateUserDto } from './dto/update-user.dto.js'
import { UsersRepository } from './repositories/users.repository.js'
import { NotFoundError } from '../common/errors/types/NotFoundError.js'
import { UserEntity } from './entities/user.entity.js'

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository) {}
  
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersRepository.create(createUserDto)
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.findAll()
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(id)
    if(!user) {
      throw new NotFoundError(`User not found with id ${id}`)
    }

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(id)
    if(!user) {
      throw new NotFoundError(`User not found with id ${id}`)
    }
    
    return this.usersRepository.update(id, updateUserDto)
  }

  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOne(id)
    if(!user) {
      throw new NotFoundError(`User not found with id ${id}`)
    }
    
    await this.usersRepository.delete(id)
  }

}
