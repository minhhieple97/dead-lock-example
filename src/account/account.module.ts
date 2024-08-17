import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [AccountService, PrismaService],
  controllers: [],
  exports: [AccountService],
})
export class AccountModule {}
