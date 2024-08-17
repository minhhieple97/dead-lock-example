import { Module } from '@nestjs/common';
import { AccountService } from './account/account.service';
import { AccountModule } from './account/account.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';

@Module({
  imports: [AccountModule, PrismaModule],
  controllers: [AppController],
  providers: [AccountService],
})
export class AppModule {}
