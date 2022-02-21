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
import FindOneUserById from '../FindUser/FindOneUserById';

class DeleteOneUserById {
  async execute(res: Response, req: Request, id: string) {
    try {
      const userRepository = getCustomRepository(UserRepository);

      const user = await FindOneUserById.execute(id);

      if (!user) return res.status(naoEncontrado).json(naoEncontrado_msg);

      await userRepository.delete(id);
      return res.status(ok).json(apagadoComSucesso);
    } catch (erro) {
      console.log(erro);
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }
}
export default new DeleteOneUserById();
