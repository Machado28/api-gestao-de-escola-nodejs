import { getCustomRepository } from 'typeorm';
import IContact from '../IContact';
import ContactRepository from '../../../../../../repositories/ContactRepository';
import { ok, proibido, vazio, naoEncontrado } from '../../../../statusHTTP_Values';
import FindOneUserById from '../../../FindUser/FindOneUserById';
import { naoEncontrado_msg, jaExistente } from '../../../../mensagensDeResposta';
import VerifyAlreadyExist from '../../../../Function/VerifyAlreadyExist';
import IDataLogin from '../IContact';
import LoginRepository from '../../../../../../repositories/LoginRepository';
import PasswordValidate from '../../../../Function/passwordValidate';

class UseCaseLogin {
  async execute(dataLogin: IDataLogin) {
    try {
      const { contactId, userId, password } = dataLogin;

      const contactRepository = getCustomRepository(ContactRepository);
      const loginRepository = getCustomRepository(LoginRepository);

      const userExist = await FindOneUserById.execute(userId);

      const isValidPassword = PasswordValidate(password);

      if (isValidPassword.status === proibido) {
        return { status: isValidPassword.status, message: isValidPassword.message };
      }

      if (!userExist)
        return {
          status: naoEncontrado,
          message: 'usuário ' + naoEncontrado_msg,
        };

      if (!userId)
        return {
          status: proibido,
          message: 'selecione um usuario!',
        };

      const contactExist = await contactRepository.findOne({ where: { id: contactId } });

      if (!contactExist)
        return {
          status: naoEncontrado,
          message: 'contacto ' + naoEncontrado_msg,
        };

      if (!contactId)
        return {
          status: proibido,
          message: 'selecione um contacto!',
        };

      const loginExist = await loginRepository.findOne({ where: { contactId, userId } });

      const loginAlreadyExist = VerifyAlreadyExist(loginExist);
      if (loginAlreadyExist!==vazio) {
        return {
          status: proibido,
          message: 'login' + jaExistente,
        };
      }

      return {
        status: ok,
        message: 'tudo certo!',
      };
    } catch (error) {
      console.log(error);
      return {
        error,
        status: 500,
      };
    }
  }
  async onDelete() {}
}
export default new UseCaseLogin();
