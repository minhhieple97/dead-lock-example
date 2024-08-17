import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async operationA(accountId: number, transactionId: number) {
    return this.prisma.$transaction(async (prisma) => {
      const transaction = await prisma.transaction.update({
        where: { id: transactionId },
        data: { amount: { increment: 100 } },
      });

      const account = await prisma.account.update({
        where: { id: accountId },
        data: { balance: { decrement: 100 } },
      });
      return { account, transaction };
    });
  }

  async operationB(transactionId: number, accountId: number) {
    return this.prisma.$transaction(async (prisma) => {
      const account = await prisma.account.update({
        where: { id: accountId },
        data: { balance: { increment: 100 } },
      });

      const transaction = await prisma.transaction.update({
        where: { id: transactionId },
        data: { amount: { decrement: 100 } },
      });

      return { account, transaction };
    });
  }
  private async executeWithRetry<T>(
    operation: () => Promise<T>,
    retries = 3,
  ): Promise<T> {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        console.warn('Deadlock detected, retrying transaction...');
        await new Promise((resolve) => setTimeout(resolve, 100));
        continue;
      }
    }
  }

  async operationAWithRetry(accountId: number, transactionId: number) {
    return await this.executeWithRetry(() =>
      this.operationA(accountId, transactionId),
    );
  }

  async operationBWithRetry(transactionId: number, accountId: number) {
    return await this.executeWithRetry(() =>
      this.operationB(transactionId, accountId),
    );
  }
}
