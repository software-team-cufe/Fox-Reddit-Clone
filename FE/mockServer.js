// mockServer.js
import { setupServer } from 'msw';
import { rest } from 'msw';

export const server = setupServer(
  rest.get('/user/:viewer/about', (req, res, ctx) => {
    return res(ctx.json({ avatar: 'mock-avatar' }));
  })
);