import {
  jaExistente,
  mensagemDeErroInterno,
  mensagemDeValidacaoDeCampo,
  naoEncontrado_msg,
} from '../mensagensDeResposta';
import { Request, Response, NextFunction } from 'express';
import {
  erroInterno,
  erroExterno,
  naoEncontrado,
  ok,
  proibido,
  indefinido,
  retornoNaoObrigatorio,
} from '../statusHTTP_Values';
import * as Yup from 'yup';
import UserCaseUser from './UserCaseUser/UserCaseUser';
import CreateUser from './CreateUser/CreateUser';
import UpdateUser from './UpdateUser/updateUser';
import FindOneUserById from './FindUser/FindOneUserById';
import FindAllUsers from './FindUser/FindAllUsers';
import FindAllUsersByGenero from './FindUser/FindAllUsersByGenero';
import FindOneUserByNumeroDeDocumento from './FindUser/FindOneUserByNumeroDeDocumento';
import DeleteUser from './DeleteUser/DeleteOneUserByNumeroDeDocumento';
import DeleteAllUsers from './DeleteUser/DeleteAllUsers';
import DeleteOneUserById from './DeleteUser/DeleteOneUserById';
import DeleteOneUserByNumeroDeDocumento from './DeleteUser/DeleteOneUserByNumeroDeDocumento';

const statusMessager = [
  {
    status: proibido,
    message: jaExistente,
  },
];
function ResponserStatus(status = ok, req: Request, res: Response) {
  return res.status(statusMessager[status].status).json(statusMessager[status].message);
}

class UserController {
  async get(req: Request, res: Response) {
    try {
      const { id, limit } = req.params;
      const user = await FindAllUsers.execute();

      if (id !== indefinido) {
        const user = await FindOneUserById.execute(id);

        if (!user) return res.status(naoEncontrado).json(naoEncontrado_msg);

        return res.status(ok).json(user);
      }

      if (limit !== indefinido) {
        const user = await FindAllUsers.execute(Number(limit));

        return res.status(ok).json(user);
      }

      return res.status(ok).json(user);
    } catch (erro) {
      console.log(erro);
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }

  async getByGenero(req: Request, res: Response) {
    try {
      const { genero, limit } = req.params;

      const user = await FindAllUsersByGenero.execute(genero, indefinido);

      if (limit !== indefinido) {
        const user = await FindAllUsersByGenero.execute(genero, Number(limit));

        return res.status(ok).json(user);
      }

      return res.status(ok).json(user);
    } catch (erro) {
      console.log(erro);
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }

  async getByNumeroDeDocumento(req: Request, res: Response) {
    try {
      const { numeroDeDocumento } = req.params;

      const user = await FindOneUserByNumeroDeDocumento.execute(numeroDeDocumento);
      console.log('user..=>', user);

      if (!user) return res.status(naoEncontrado).json(naoEncontrado_msg);

      return res.status(ok).json(user);
    } catch (erro) {
      console.log(erro);
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string().required(),
        numeroDeDocumento: Yup.string(),
        dataDeNascimento: Yup.string().required(),
        genero: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(erroExterno).json({
          mensagemDeValidacaoDeCampo,
        });
      }

      const { numeroDeDocumento, nome, dataDeNascimento, genero } = req.body;

      const user = {
        numeroDeDocumento,
        nome,
        dataDeNascimento,
        genero,
      };

      const permited = await UserCaseUser.execute(user);
      if (permited === proibido) {
        return res.status(proibido).json(jaExistente);
      }

      return await CreateUser.execute(req.body, res, req);
    } catch (erro) {
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id, numeroDeDocumento } = req.params;
      console.log('id:=>', id, 'bi=>', numeroDeDocumento);
      if (id !== indefinido) return await DeleteOneUserById.execute(res, req, id);

      if (numeroDeDocumento !== indefinido)
        return await DeleteOneUserByNumeroDeDocumento.execute(res, req, numeroDeDocumento);

      return await DeleteAllUsers.execute(res, req);

      return res.status(retornoNaoObrigatorio).json();
    } catch (erro) {
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const UserDataUpdate = await UpdateUser.execute(res, req, id, req.body);

      return res.status(retornoNaoObrigatorio).json();
    } catch (erro) {
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }
}
export default new UserController();
