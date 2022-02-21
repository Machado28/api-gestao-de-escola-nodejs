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
import UseCaseContact from './UseCaseContact/UseCaseContact';
import CreateContact from './CreateContact/CreateContact';
import FindAllContacts from './FindContact/FindAllContacts';
import FindOneContactById from './FindContact/FindOneContactById';
import FindAllContactByUser from './FindContact/FindAllContactByUser ';
import DeleteAllContactOfUser from './DeleteContact/DeleteAllContactOfUser';
import DeleteOneContactOfUser from './DeleteContact/DeleteOneContactOfUser';

class ContactController {
  async get(req: Request, res: Response) {
    try {
      const { id, limit } = req.params;
      const contact = await FindAllContacts.execute();

      if (id !== indefinido) {
        const contact = await FindOneContactById.execute(id);

        if (!contact) return res.status(naoEncontrado).json(naoEncontrado_msg);

        return res.status(ok).json(contact);
      }

      if (limit !== indefinido) {
        const contact = await FindAllContacts.execute(Number(limit));

        return res.status(ok).json(contact);
      }

      return res.status(ok).json(contact);
    } catch (erro) {
      console.log(erro);
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }

  async getAllByUser(req: Request, res: Response) {
    try {
      const { userId, limit } = req.params;
      const contact = await FindAllContactByUser.execute(userId);

      if (limit !== indefinido) {
        const contact = await FindAllContactByUser.execute(userId,null,Number(limit));

        return res.status(ok).json(contact);
      }

      return res.status(ok).json(contact);
    } catch (erro) {
      console.log(erro);
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        designacao: Yup.string().required(),
        descricao: Yup.string(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(erroExterno).json(mensagemDeValidacaoDeCampo);
      }

      const { designacao, descricao, userId } = req.body;

      const permition = await UseCaseContact.execute({ designacao, descricao, userId });
      if (permition.status === proibido) {
        return res.status(proibido).json(permition.message);
      }

      if (permition.status === naoEncontrado) {
        return res.status(permition.status).json(permition.message);
      }
      if (permition.status === ok)
        return await CreateContact.execute({ designacao, descricao, userId }, res, req);

      return await CreateContact.execute({ designacao, descricao, userId }, res, req);


    } catch (erro) {
      return res.status(erroInterno).json(mensagemDeErroInterno);
    }
  }


  async delete(req: Request, res: Response) {
      try {
        const { userId,id } = req.params;

        if (id !== indefinido) return await DeleteOneContactOfUser.execute(userId,id,res, req);

        return await DeleteAllContactOfUser.execute(userId,res, req);

        return res.status(retornoNaoObrigatorio).json();
      } catch (erro) {
        return res.status(erroInterno).json(mensagemDeErroInterno);
      }
    }
}



export default new ContactController();
