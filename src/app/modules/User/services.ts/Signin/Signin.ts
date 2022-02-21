import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import auth from '../../../../../config/auth';
import Login from '../../../../models/Login';
import VerifyAlreadyExist from '../../../Function/VerifyAlreadyExist';
import { mensagemDeErroInterno, mensagemDeValidacaoDeCampo } from '../../../mensagensDeResposta';
import { erroInterno, naoAutorizado, naoEncontrado, ok } from '../../../statusHTTP_Values';
import FindLogin from '../Login/FindLogin/FindLogin';

class Signin {
  async execute(req: Request, res: Response) {
    try {
      const { password, email } = req.body;

      const login = await FindLogin.execute(email, password);


      if (login?.status === naoAutorizado || login.status === naoEncontrado) {
        return res.status(naoAutorizado).json(login?.message);
      }
      if (login?.status === erroInterno) {
        return res.status(login?.status).json(login.message);
      }

      const token = jwt.sign({ _id: login.id }, process.env.SECRET);

      const date = new Date();
      res.cookie('token', token, { expires: date });

      const { id, userId, contactId } = login;
      console.log(login);

      return res.status(ok).json({ token, login: { id, userId, contactId } });
    } catch (error) {
      console.log(error);
      return res.status(erroInterno).json(mensagemDeErroInterno + error);
    }
  }
}
export default new Signin();
