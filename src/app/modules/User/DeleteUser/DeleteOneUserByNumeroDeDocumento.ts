import { erroInterno, ok, proibido, nulo, naoEncontrado } from '../../statusHTTP_Values';
import UserRepository from '../../../../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import {
  apagadoComSucesso,
  mensagemDeErroInterno,
  naoEncontrado_msg,
} from '../../mensagensDeResposta';
import { Response, Request } from 'express';
import FindOneUserById from '../FindUser/FindOneUserById';
import FindAllUsers from '../FindUser/FindAllUsers';
import FindOneUserByNumeroDeDocumento from '../FindUser/FindOneUserByNumeroDeDocumento';

class DeleteOneUserByNumeroDeDocumento {
  async execute(res: Response, req: Request, numeroDeDocumento: string) {
    try {
      const userRepository = getCustomRepository(UserRepository);

      const user = await FindOneUserByNumeroDeDocumento.execute(numeroDeDocumento);

      if (!user) return res.status(naoEncontrado).json(naoEncontrado_msg);

      await userRepository.delete(user.id);
      return res.status(ok).json(apagadoComSucesso);
    } catch (erro) {
      console.log(erro);
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }
}
export default new DeleteOneUserByNumeroDeDocumento();
