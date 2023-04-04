import { AdminProcedure } from './../src/trpc';
import { userRouter } from './users';
import { t } from '../src/trpc';

export const appRouter = t.router({
  getHello: t.procedure.query(() => {
    return 'Hello From tRPC';
  }),
  postHello: t.procedure
    .input((v) => {
      if (typeof v === 'string') return v;

      throw new Error('Invalid Input : Expected String');
    })
    .mutation((req) => {
      return `success ${req.input}`;
    }),
  adminData: AdminProcedure.query(({ ctx }) => {
    console.log(ctx.user.name);
    return { data: ctx.user.name };
  }),
  users: userRouter,
});

// to maintain same level of nesting as getHello, use mergeRouter function

export const mergedAppRouter = t.mergeRouters(appRouter, userRouter);
