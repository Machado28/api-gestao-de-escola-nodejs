import { Response, Request } from 'express';

export const Responser = (status: number, mensagem?: any, res?: Response, req?: Request) => {
  try {
    status = 500;
    console.log('responser is fine! ', status);

    return res.status(status).json(mensagem);
  } catch (erro) {
    return res.status(status).json({ erro });
  }
};
