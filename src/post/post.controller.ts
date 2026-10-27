
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { PostService } from './post.service.js'
import { CreatePostDto } from './dto/create-post.dto.js'
import { UpdatePostDto } from './dto/update-post.dto.js'
import { ApiForbiddenResponse } from '@nestjs/swagger'

@Controller('posts')
export class PostController {

  constructor(private readonly postService: PostService) {}

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto)
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get()
  findAll() {
    return this.postService.findAll()
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id)
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto)
  }

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id)
  }
  
}
