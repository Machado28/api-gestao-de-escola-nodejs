import { erroInterno, ok } from '../../../../statusHTTP_Values';
import LoginRepository from '../../../../../../repositories/LoginRepository';
import { getCustomRepository } from 'typeorm';
import { mensagemDeErroInterno } from '../../../../mensagensDeResposta';
import { Response, Request } from 'express';
import IDataLogin from '../IContact';


class CreateDataLogin {
  async execute(loginData: IDataLogin, res: Response, req: Request) {
    try {
      const loginRepository = getCustomRepository(LoginRepository);
      const {userId,contactId,password } = loginData;


      const loginCreated = loginRepository.create({
        password,
        userId,
        contactId
      });

      const LoginSeved = await loginRepository.save(loginCreated);


      return res.status(ok).json(LoginSeved);
    } catch (erro) {
      console.log(erro);
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }
}
export default new CreateDataLogin();
