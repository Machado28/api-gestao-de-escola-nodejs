import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authData from '../../config/auth';
import User from '../models/User';

declare module 'express-session' {
  interface SessionData {
    usuario: User;
  }
}
class Autenticacao {
  async apiAuth(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers['api-key']) {
        let apiKey = req.headers['api-key'];

        if (apiKey !== process.env.API_KEY) {
          return res.status(400).json({
            message: 'Chave da API inválida!',
          });
        }
        next();
      }
    } catch (err) {
      return res.status(400).json({ error: 'falha na autenticação da API!', err });
    }
  };
  async tokenAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.json({ message: 'Token not provided', status: 400 });
    }
    const [, token] = authHeader.split(' ');

    try {
      jwt.verify(token, authData.key, (err, decoded:jwt.JwtPayload) => {
        if (err) return res.status(400).json({ error: `error: ${err}` });
        req.session = decoded?.session;
        return next();
      });
    } catch (err) {
      return res.status(400).json({ error: 'falha na autenticação de usuário!', err });
    }
  }
}
export default new Autenticacao();
