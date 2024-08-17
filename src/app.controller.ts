import { Controller, Post } from '@nestjs/common';
import { AccountService } from './account/account.service';

@Controller()
export class AppController {
  constructor(private readonly accountService: AccountService) {}

  @Post('balance-deadlock')
  async simulateDeadlock() {
    const accountId = 1;
    const transactionId = 1;

    return await Promise.all([
      this.accountService.operationA(accountId, transactionId),
      this.accountService.operationB(transactionId, accountId),
    ]);
  }
  @Post('balance-deadlock-resolve')
  async resolveDeadlock() {
    const accountId = 1;
    const transactionId = 1;

    return await Promise.all([
      this.accountService.operationAWithRetry(accountId, transactionId),
      this.accountService.operationBWithRetry(transactionId, accountId),
    ]);
  }
}
