import EventEmitter from 'stream';
import { AdminProcedure, t } from '../src/trpc';
import { z } from 'zod';
import { observable } from '@trpc/server/observable';

const eventEmitter = new EventEmitter();

const userProcedure = t.procedure.input(
  z.object({
    name: z.string(),
    role: z.string(),
    email: z.string(),
  })
);
export const userRouter = t.router({
  getUser: t.procedure.query(() => {
    return {
      name: 'random user',
      role: 'user',
      email: 'random@gmail.com',
    };
  }),
  createUser: AdminProcedure.input(
    z.object({
      name: z.string(),
      role: z.string(),
      email: z.string(),
    })
  )
    .output(
      z.object({
        name: z.string(),
        email: z.string(),
        role: z.string(),
      })
    )
    .mutation((req) => {
      // req.ctx; // this is context which is useful to handle authentication and authorization
      console.log(
        req.ctx.user.name ? 'This is Admin' : 'This is a normal user'
      );
      eventEmitter.emit('update', req.input.name);
      return {
        name: req.input.name,
        email: req.input.email,
        role: req.input.role,
      };
    }),
  onUpdate: t.procedure.subscription(() => {
    return observable<string>((emit) => {
      eventEmitter.on('update', emit.next);

      return () => {
        eventEmitter.off('update', emit.next);
      };
    });
  }),
  login: t.procedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation((req) => {}),
});
