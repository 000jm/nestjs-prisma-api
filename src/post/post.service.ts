
import { Injectable } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto.js'
import { UpdatePostDto } from './dto/update-post.dto.js'
import { PostsRepository } from './repositories/posts.repository.js'
import { NotFoundError } from '../common/errors/types/NotFoundError.js'
import { PostEntity } from './entities/post.entity.js'

@Injectable()
export class PostService {

  constructor(private readonly postsRepository: PostsRepository) {}
  
  async create(createPostDTO: CreatePostDto): Promise<PostEntity> {
    return this.postsRepository.create(createPostDTO)
  }

  async findAll(): Promise<PostEntity[]> {
    return await this.postsRepository.findAll()
  }

  async findOne(id: number): Promise<PostEntity> {
    const post = await this.postsRepository.findOne(id)
    if(!post) {
      throw new NotFoundError(`Post not found with id ${id}`)
    }

    return post
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const post = await this.postsRepository.findOne(id)
    if(!post) {
      throw new NotFoundError(`Post not found with id ${id}`)
    }
    
    return this.postsRepository.update(id, updatePostDto)
  }

  async remove(id: number): Promise<void> {
    const post = await this.postsRepository.findOne(id)
    if(!post) {
      throw new NotFoundError(`Post not found with id ${id}`)
    }
    
    await this.postsRepository.delete(id)
  }

}
