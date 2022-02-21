import { Response, Request } from 'express';
import { mensagemDeErroInterno } from '../../../mensagensDeResposta';
import { erroInterno } from '../../../statusHTTP_Values';

class Signout {
  async execute(req: Request, res: Response) {
    try {
      res.clearCookie('token');
      return res.json({
        message: 'signout feito com sucesso',
      });
    } catch (error) {
      console.log(error);
      return res.status(erroInterno).json(mensagemDeErroInterno + error);
    }
  }
}
export default new Signout();
