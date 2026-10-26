
import { Injectable } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service.js"
import { CreatePostDto } from "../dto/create-post.dto.js"
import { UpdatePostDto } from "../dto/update-post.dto.js"
import { PostEntity } from "../entities/post.entity.js"

@Injectable()
export class PostsRepository {

    constructor(private readonly prisma: PrismaService) {}

    async create(createPostDto: CreatePostDto): Promise<PostEntity> {
        return this.prisma.post.create({
            data: createPostDto
        })
    }
    
    async findAll(): Promise<PostEntity[]> {
        return await this.prisma.post.findMany()
    }
    
    async findOne(id: number): Promise<any> {
        return this.prisma.post.findUnique({
            where: {
                id
            }
        })
    }

    async update(id: number, updatePostDto: UpdatePostDto) {
        return this.prisma.post.update({
            where: {
                id
            },
            data: updatePostDto
        })
    }

    async delete(id: number) {
        return this.prisma.post.delete({
            where: {
                id
            }
        })
    }

}
