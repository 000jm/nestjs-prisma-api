
import { Module } from '@nestjs/common'
import { PostService } from './post.service.js'
import { PostController } from './post.controller.js'
import { PrismaService } from '../prisma/prisma.service.js'
import { PostsRepository } from './repositories/posts.repository.js'

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, PostsRepository],
})
export class PostModule {}
