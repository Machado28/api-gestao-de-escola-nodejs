import { getCustomRepository } from 'typeorm';
import IContact from '../IContact';
import ContactRepository from '../../../../repositories/ContactRepository';
import { ok, proibido, vazio, naoEncontrado } from '../../statusHTTP_Values';
import FindOneUserById from '../../User/FindUser/FindOneUserById';
import { naoEncontrado_msg, jaExistente } from '../../mensagensDeResposta';
import VerifyAlreadyExist from '../../Function/VerifyAlreadyExist';

class UseCaseContact {
  async execute(contactData: IContact,) {
    try {
      const { designacao,userId } = contactData;

      const contactRepository = getCustomRepository(ContactRepository);

      const userExist = await FindOneUserById.execute(userId);
      console.log('user Id=', userId);
      console.log('user exit=', userExist);

      if (!userExist)
        return {
          status: naoEncontrado,
          message: 'usuário ' + naoEncontrado_msg,
        };
      if(!userId)return {
            status: proibido,
            message: 'selecione um usuario!',
          };
      const contactAlreadyExist = await contactRepository.findOne({ where: {designacao} });

      VerifyAlreadyExist(contactAlreadyExist)
      if (contactAlreadyExist) {
        console.log('contacto:=>'+contactAlreadyExist);
        return {
          status: proibido,
          message: jaExistente,
        };
      }
      return {
        status: ok,
      };
    } catch (error) {
      console.log(error);
      return {
            error,
            status:500
      }
    }
  }
  async onDelete(){

  }
}
export default new UseCaseContact();
