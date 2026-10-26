
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import prismaPackage from '@prisma/client';

const { PrismaClient } = prismaPackage;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

    async onModuleInit() {
        await this.$connect()
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close()
        })
    }

}
