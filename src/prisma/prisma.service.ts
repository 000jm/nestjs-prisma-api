import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import prismaPackage from '@prisma/client';

const { PrismaClient } = prismaPackage;

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}