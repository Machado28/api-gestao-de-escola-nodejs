import { Request, Response } from 'express';
import * as Yup from 'yup';
import VerifyAlreadyExist from '../../../Function/VerifyAlreadyExist';
import {
  mensagemDeErroInterno,
  mensagemDeValidacaoDeCampo,
  naoEncontrado_msg,
} from '../../../mensagensDeResposta';
import {
  erroExterno,
  erroInterno,
  indefinido,
  naoEncontrado,
  ok,
  proibido,
  vazio,
} from '../../../statusHTTP_Values';
import CreateDataLogin from './CreateDataLogin/CreateDataLogin';
import FindOneDataLoginOfUser from './FindLogin/FindOneDataLoginOfUser';
import UseCaseDataLogin from './UseCaseDataLogin/UseCaseDataLogin';

class LoginController {
  async get(req: Request, res: Response) {
    try {
      const { userId, limit } = req.params;
      const login = await FindOneDataLoginOfUser.execute(userId);
      const exitLogin = VerifyAlreadyExist(login);

      if (exitLogin === vazio) {
        return res.status(naoEncontrado).json(naoEncontrado_msg);
      }
      return res.status(ok).json(login);
    } catch (erro) {
      console.log(erro);
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        password: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(erroExterno).json(mensagemDeValidacaoDeCampo);
      }

      const { password } = req.body;
      const { userId, contactId } = req.params;

      const permition = await UseCaseDataLogin.execute({ password, contactId, userId });

      if (permition.status === proibido) {
        return res.status(proibido).json(permition.message);
      }

      if (permition.status === naoEncontrado) {
        return res.status(permition.status).json(permition.message);
      }
      if (permition.status === ok)
        return await CreateDataLogin.execute({ password, contactId, userId }, res, req);

      return await CreateDataLogin.execute({ password, contactId, userId }, res, req);
    } catch (erro) {
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }
}
export default new LoginController();
