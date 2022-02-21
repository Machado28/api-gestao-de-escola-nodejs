import { erroInterno, ok, proibido, nulo, naoEncontrado } from '../../statusHTTP_Values';
import UserRepository from '../../../../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import {
  apagadoComSucesso,
  mensagemDeErroInterno,
  naoEncontrado_msg,
} from '../../mensagensDeResposta';
import { Response, Request } from 'express';
import ContactRepository from '../../../../repositories/ContactRepository';
import FindAllContactByUser from '../FindContact/FindAllContactByUser ';
import FindOneContactByUser from '../FindContact/FindOneContactByUser';

class DeleteOneContactOfUser {
  async execute(userId: string, contactId: string, res: Response, req: Request) {
    try {
      const contactRepository = getCustomRepository(ContactRepository);

      const contact = await FindOneContactByUser.execute(userId, contactId);

      if (contact) {
        await contactRepository.delete(contact.id);
      }

      return res.status(ok).json(apagadoComSucesso);
    } catch (erro) {
      console.log(erro);
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }
}
export default new DeleteOneContactOfUser();
