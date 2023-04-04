import { AuthContext } from './context';
import { appRouter } from '../routers/index';
import express from 'express';
import cors from 'cors';

import { createExpressMiddleware } from '@trpc/server/adapters/express';

// import { appRouter } from '../routers';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(
  '/trpc',
  createExpressMiddleware({ router: appRouter, createContext: AuthContext })
);

app.listen(8000, () => {
  console.log('server is running on http://localhost:8000');
});

// applyWSSHandler({
//   wss: new ws.Server(),
//   router: appRouter,
//   createContext: AuthContext,
// });

export type AppRouter = typeof appRouter; // this to export type for client type safety
