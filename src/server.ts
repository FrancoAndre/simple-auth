import express, { json } from 'express';

import routes from './routes';

const app = express();

app.use(json({
  limit: '2mb',
}));

app.get('/', (_, res) => {
  res.json({ message: "Welcome to Simple Auth!" })
})

app.use(routes);

app.listen('222', () => {
  console.log('💻 Server is running on port: 222')
})
