import express, { json } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger';


import routes from './routes';

const app = express();

app.use(json({
  limit: '2mb',
}));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get('/', (_, res) => {
  res.json({ message: "Welcome to Simple Auth!" })
})

app.use(routes);

app.listen('222', () => {
  console.log('💻 Server is running on port: 222')
})
