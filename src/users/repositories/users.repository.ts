
import { Injectable } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service.js"
import { CreateUserDto } from "../dto/create-user.dto.js"
import { UpdateUserDto } from "../dto/update-user.dto.js"
import { UserEntity } from "../entities/user.entity.js"

@Injectable()
export class UsersRepository {

    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {

        return await this.prisma.user.create({
            data: createUserDto,
            include: {
                posts: {
                    select: {
                        title: true,
                        content: true,
                        createdAt: true
                    }
                }
            }
        })

    }

    async findAll(): Promise<UserEntity[]> {

        return this.prisma.user.findMany({
            include: {
                posts: {
                    select: {
                        title: true,
                        content: true,
                        createdAt: true
                    }
                }
            }
        })
        
    }

    async findOne(id: number) {

        return this.prisma.user.findUnique({
            where: {
                id
            },
            include: {
                posts: {
                    select: {
                        id: true,
                        title: true,
                        content: true,
                        createdAt: true,
                        updatedAt: true
                    }
                }
            }
        })
        
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {

        return this.prisma.user.update({
            where: {
                id
            },
            data: updateUserDto,
            include: {
                posts: {
                    select: {
                        title: true,
                        content: true,
                        createdAt: true
                    }
                }
            }
        })

    }

    async delete(id: number) {

        await this.prisma.user.delete({
            where: {
                id
            }
        })
        
    }

}
