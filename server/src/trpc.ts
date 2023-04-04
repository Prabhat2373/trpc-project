import { AuthContext } from './context';
import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';

export const t = initTRPC
  .context<inferAsyncReturnType<typeof AuthContext>>()
  .create();

// Adwding middleware like express for authorization or protecting routes

const isAdminMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.isAdmin) {
    throw new TRPCError({ code: 'UNAUTHORIZED' }); // will send unauthorized error to client
  }
  return next({ ctx: { user: { name: 'ADMIN PRABHAT' } } }); // Addeing values to your existing context that you can use in admin router only
});

// const isLoggedIn = t.middleware(({ ctx, next }) => {
  
// });

export const AdminProcedure = t.procedure.use(isAdminMiddleware); // this is exactly how express uses Middlewares
