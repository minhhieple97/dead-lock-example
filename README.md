# Deadlock Simulation Project

This project is designed to simulate a deadlock situation using Nest.js, Prisma, pnpm, and PostgreSQL. The goal is to understand how deadlocks occur and how they can be resolved or avoided in a database environment.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: v14 or later
- **pnpm**: v6 or later
- **PostgreSQL**: v12 or later
- **Nest.js CLI**: v8 or later

## Installation

1. **Clone the repository**:
   git clone git@github.com:minhhieple97/dead-lock-example.git
   cd dead-lock-example

2. **Install node modules**:
   pnpm i

3. **Create the Prisma database**:
   npx prisma migrate dev
   4 **Seed the database**:
   npm run seed

4. **Start the application**:
   npm run start:dev

The application will be running at `http://localhost:3000`.

## Simulating and Resolving a Deadlock

### Simulating a Deadlock

To simulate a deadlock, use the `/balance-deadlock` endpoint. This endpoint triggers two transactions that attempt to update the same resources in a conflicting order, leading to a deadlock.

- **Endpoint**: `POST /balance-deadlock`
- **Description**: Simulates a deadlock by executing conflicting transactions.

### Resolving a Deadlock

To resolve a deadlock, use the `/balance-deadlock-resolve` endpoint. This endpoint implements logic to handle and resolve the deadlock situation.

- **Endpoint**: `POST /balance-deadlock-resolve`
- **Description**: Attempts to resolve the deadlock by retrying or rolling back transactions.

### Testing the Endpoints

Use a tool like Postman or curl to send POST requests to the endpoints:

- Simulate a deadlock:
  bash
  curl -X POST http://localhost:3000/balance-deadlock

- Resolve a deadlock:
  bash
  curl -X POST http://localhost:3000/balance-deadlock-resolve

## Troubleshooting

- Ensure your PostgreSQL server is running and accessible.
- Verify that your `.env` file contains the correct database connection string.
- Check the Nest.js application logs for any errors.

## Contributing

Contributions are welcome! Please fork the repository and use a feature branch. Pull requests are reviewed on a regular basis.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

## Contact

If you have any questions or suggestions, feel free to reach out.
