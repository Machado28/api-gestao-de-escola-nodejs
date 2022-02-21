import { erroInterno, ok, naoEncontrado, indefinido } from '../../statusHTTP_Values';
import UserRepository from '../../../../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import {
  ActualizadoComSucesso,
  mensagemDeErroInterno,
  naoEncontrado_msg,
} from '../../mensagensDeResposta';
import { Response, Request } from 'express';
import FindOneUserById from '../FindUser/FindOneUserById';
import IUser from '../Iuser';

class UpdateUser {
  async execute(res: Response, req: Request, id: string, user: IUser) {
    try {
      const userRepository = getCustomRepository(UserRepository);

      const userDataActual = await FindOneUserById.execute(id);

      if (!user) return res.status(naoEncontrado).json(naoEncontrado_msg);

      let { nome, dataDeNascimento, genero, numeroDeDocumento } = user;

      if (nome === indefinido) nome = userDataActual.nome;
      if (dataDeNascimento === indefinido) dataDeNascimento = userDataActual.dataDeNascimento;
      if (genero === indefinido) genero = userDataActual.genero;
      if (numeroDeDocumento === indefinido) numeroDeDocumento = userDataActual.numeroDeDocumento;

      await userRepository.update({ id }, { nome, dataDeNascimento, genero, numeroDeDocumento });

      return res.status(ok).json(ActualizadoComSucesso);
    } catch (erro) {
      console.log(erro);
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }
}
export default new UpdateUser();
