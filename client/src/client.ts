import { AppRouter } from '../../server/src/index';

import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  loggerLink,
  wsLink,
} from '@trpc/client';

// LINKS
// 1. loggerLink() // Will log all the requests and response which you make from client and server
// 2. httpBatchLink() // it is used to make httpRequest and it can aggregate all the request in a single array (batch) (It should call at the end)
// 3. httpLink() // it works same as httpBatchLink but it doesn't batch any requests
// 4. wsLink() // used for listening web sockets from server

const client = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(), // It will log all the requests you will make in your client
    // wsLink({
    //   client: createWSClient({
    //     url: 'ws/http://localhost:8000/trpc',
    //   }),
    // }),
    httpBatchLink({
      url: 'http://localhost:8000/trpc', // this is to connect your server via URL
      headers: { Authorization: 'TOKEN' },
    }),
  ],
});

async function API() {
  const result = await client.users.createUser; // hit a GET Request to server
  const resPost = await client.postHello.mutate('This is from client'); // hit POST Request to server
  const getUser = await client.users.getUser.query();
  const postUserResponse = await client.users.createUser.mutate({
    name: 'prabhat',
    email: 'prabhat@gmail.com',
    role: 'admin',
  });
  const AdminResponse = await client.adminData.query();
  client.users.onUpdate;
  console.log(result);
  console.log(resPost);
  console.log('user', getUser);
  console.log('user', postUserResponse);
  console.log('admin', AdminResponse);
}

API();
