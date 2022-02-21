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

class DeleteAllContactOfUser {
  async execute(userId: string, res: Response, req: Request) {
    try {
      const contactRepository = getCustomRepository(ContactRepository);

      const contacts = await FindAllContactByUser.execute(userId);

      if (contacts) {
        contacts[0];
        contacts.map(
          async (contact, index) => await contactRepository.delete(contact.id)
        );
      }

      return res
        .status(ok)
        .json(
          'lista de contacto ' +
            apagadoComSucesso! +
            '\n\n deixamos um contacto para efeito de login!'
        );
    } catch (erro) {
      console.log(erro);
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }
}
export default new DeleteAllContactOfUser();
