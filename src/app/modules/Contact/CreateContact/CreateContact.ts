import { erroInterno, ok } from '../../statusHTTP_Values';
import ContactRepository from '../../../../repositories/ContactRepository';
import { getCustomRepository } from 'typeorm';
import { mensagemDeErroInterno } from '../../mensagensDeResposta';
import { Response, Request } from 'express';
import FindOneUserById from '../../User/FindUser/FindOneUserById';
import User from '../../../models/User';
import UserRepository from '../../../../repositories/UserRepository';
import sendEmail from '../SendEmail';

interface IContact {
  designacao: string;
  descricao: string;
  userId: User;
}

class CreateContact {
  async execute(contactData: IContact, res: Response, req: Request) {
    try {
      const contactRepository = getCustomRepository(ContactRepository);
      const userRepository = getCustomRepository(UserRepository);
      const { designacao, descricao, userId } = contactData;

      const user = await userRepository.findOne({where:{id:contactData.userId}});


      const contactCreated = contactRepository.create({
        designacao,
        descricao,
        userId: user,
      });

      const contactSeved = await contactRepository.save(contactCreated);

      await sendEmail.execute(designacao,req,res)

      return res.status(ok).json(contactSeved);
    } catch (erro) {
      console.log(erro);
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }
}
export default new CreateContact();
