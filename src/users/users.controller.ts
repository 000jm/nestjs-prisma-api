
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { UsersService } from './users.service.js'
import { CreateUserDto } from './dto/create-user.dto.js'
import { UpdateUserDto } from './dto/update-user.dto.js'
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger'

// @ApiTags('Users')
@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 409, description: 'Conflito de email' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }

}
