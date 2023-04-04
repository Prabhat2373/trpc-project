// Create Context for any kind of middleware things you want like authorization

import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
export const AuthContext = ({ req, res }: CreateExpressContextOptions) => {
  console.log(req.headers.authorization);
  return {
    isAdmin: false,
  };
};
