import { erroInterno, ok, proibido, nulo, naoEncontrado } from '../../statusHTTP_Values';
import UserRepository from '../../../../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import {
  apagadoComSucesso,
  mensagemDeErroInterno,
  naoEncontrado_msg,
} from '../../mensagensDeResposta';
import { Response, Request } from 'express';
import FindAllUsers from '../FindUser/FindAllUsers';

class DeleteAllUsers {
  async execute(res: Response, req: Request) {
    try {
      const userRepository = getCustomRepository(UserRepository);

      const user = await FindAllUsers.execute();

      if (user) {
        user.map(async user => await userRepository.delete(user.id));
      }

      return res.status(ok).json('lista de usuarios '+apagadoComSucesso);
    } catch (erro) {
      console.log(erro);
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }
}
export default new DeleteAllUsers();
