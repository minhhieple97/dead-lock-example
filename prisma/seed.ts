// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create 10 accounts
  for (let i = 1; i <= 10; i++) {
    await prisma.account.create({
      data: {
        balance: Math.random() * 1000,
        ownerName: `Owner ${i}`,
        email: `owner${i}@example.com`,
      },
    });
  }

  // Create 20 transactions
  for (let i = 1; i <= 20; i++) {
    await prisma.transaction.create({
      data: {
        amount: Math.random() * 500,
        type: i % 2 === 0 ? 'credit' : 'debit',
        accountId: (i % 10) + 1, // Randomly assign to one of the 10 accounts
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
