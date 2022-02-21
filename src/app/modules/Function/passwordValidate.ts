import { Request, Response } from 'express';
import { proibido, erroInterno } from '../statusHTTP_Values';
import { mensagemDeErroInterno } from '../mensagensDeResposta';

export default function PasswordValidate(password: string) {
  try {
    if (password.length <= 7) {
      return { status: proibido, message: ' A senha deve conter no mínimo 8 caracteres!' };
    }
  } catch (error) {
    return {
      status: erroInterno,
      message: mensagemDeErroInterno,
    };
  }
}
