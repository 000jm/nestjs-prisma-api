
import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service.js"
import { CreateUserDto } from "../dto/create-user.dto.js"
import { UpdateUserDto } from "../dto/update-user.dto.js"
import { UserEntity } from "../entities/user.entity.js"

@Injectable()
export class UsersRepository {

    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {

        return await this.prisma.user.create({
            data: createUserDto
        })

    }

    async findAll(): Promise<UserEntity[]> {

        return this.prisma.user.findMany()
        
    }

    findOne(id: number) {

        return this.prisma.user.findUnique({
            where: {
                id
            }
        })
        
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {

        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        })

        if(!user) {
            throw new NotFoundException(`User with id ${id}`)
        }

        return this.prisma.user.update({
            where: {
                id
            },
            data: updateUserDto
        })

    }

    async remove(id: number) {

        await this.prisma.user.delete({
            where: {
                id
            }
        })
        
    }

}
