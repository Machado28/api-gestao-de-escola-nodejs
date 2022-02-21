import IUser from '../Iuser';
import * as Yup from 'yup';
import { erroInterno, ok } from '../../statusHTTP_Values';
import UserRepository from '../../../../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import { mensagemDeErroInterno } from '../../mensagensDeResposta';
import { Response, Request } from 'express';

class CreateUser {
  async execute(userData: IUser, res: Response, req: Request) {
    try {
      const userRepository = getCustomRepository(UserRepository);

      const createdUser = userRepository.create(userData);

      const userSeved = await userRepository.save(createdUser);
      console.log('salvou');

      return res.status(ok).json(userSeved);
    } catch (erro) {
      console.log(erro);
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }
}
export default new CreateUser();
