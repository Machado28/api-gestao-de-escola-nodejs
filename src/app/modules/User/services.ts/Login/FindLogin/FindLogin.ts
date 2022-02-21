import LoginRepository from '../../../../../../repositories/LoginRepository';
import { getCustomRepository } from 'typeorm';
import FindOneContactByDesignacao from '../../../../Contact/FindContact/FindOneContactByDesignacao';
import {
  erroInterno,
  naoEncontrado,
  ok,
  vazio,
} from '../../../../statusHTTP_Values';
import { mensagemDeErroInterno } from '../../../../mensagensDeResposta';
import VerifyAlreadyExist from '../../../../Function/VerifyAlreadyExist';
import bcrypt from 'bcrypt';

class FindLogin {
  async execute(email: string, password: string) {
    try {
      const loginRepository = getCustomRepository(LoginRepository);
      const emailFinded = await FindOneContactByDesignacao.execute(email);
      const notExist = vazio;
      const emailAlreadyExist = VerifyAlreadyExist(emailFinded);

      if (emailAlreadyExist === notExist) {
        return {
          status: naoEncontrado,
          message: 'Login ou Senha inválido',
        };
      }

      const LoginWithEmail = await loginRepository.findOne({
        where: { contactId: emailFinded.id },
      });


      const { id, userId, contactId } = LoginWithEmail;
      const existLogin = VerifyAlreadyExist(LoginWithEmail);

      if (existLogin === vazio) {
        return {
          status: naoEncontrado,
          message: 'Login ou Senha inválido',
        };
      }
      const passwordValid = await bcrypt.compare(password, LoginWithEmail.password);

      if (!passwordValid) {
        return {
          status: naoEncontrado,
          message: 'Login ou Senha inválido',
        };
      }

      return {
        id,
        userId,
        contactId,
        status: ok,
      };
    } catch (error) {
      return {
        status: erroInterno,
        message: mensagemDeErroInterno + error,
      };
    }
  }
}
export default new FindLogin();
