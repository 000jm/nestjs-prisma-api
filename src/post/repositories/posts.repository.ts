
import { Injectable } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service.js"
import { CreatePostDto } from "../dto/create-post.dto.js"
import { UpdatePostDto } from "../dto/update-post.dto.js"
import { PostEntity } from "../entities/post.entity.js"
import { Prisma } from "@prisma/client"
import { NotFoundError } from "../../common/errors/types/NotFoundError.js"

@Injectable()
export class PostsRepository {

    constructor(private readonly prisma: PrismaService) {}

    async create(createPostDto: CreatePostDto): Promise<PostEntity> {
        const { authorEmail } = createPostDto

        delete createPostDto.authorEmail

        const user = await this.prisma.user.findUnique({
            where: {
                email: authorEmail
            }
        })
        if(!user) {
            throw new NotFoundError(`Author not found with email ${authorEmail}`)
        }

        const data: Prisma.PostCreateInput = {
            ...createPostDto,
            author: {
                connect: {
                    email: authorEmail
                }
            }
        }

        return this.prisma.post.create({
            data
        })
    }
    
    async findAll(): Promise<PostEntity[]> {
        return await this.prisma.post.findMany({
            include: {
                // author: true
                author: {
                    select: {
                        name: true,
                        email: true,
                        admin: true,
                        createdAt: true
                    }
                }
            }
        })
    }
    
    async findOne(id: number): Promise<any> {
        return this.prisma.post.findUnique({
            where: {
                id
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true
                    }
                }
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
