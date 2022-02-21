import 'reflect-metadata';
import { Response, Request, NextFunction } from 'express';
import express from 'express';
import './database/index';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index';

const server = express();
server.use(express.json());

server.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,UPDATE');
  server.use(cors);
  next();
});

server.use(morgan(':method :url :response-time'));

server.use(routes);

const port = process.env.PORT || 6666;
server.listen(process.env.PORT, () => {
  console.log('servidor iniciado na porta:' + port);
});
server.listen().close()

