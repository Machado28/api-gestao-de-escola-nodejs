import { getCustomRepository } from 'typeorm';
import IUser from '../Iuser';
import UserRepository from '../../../../repositories/UserRepository';
import { ok, proibido, vazio } from '../../statusHTTP_Values';
import VerifyAlreadyExist from '../../Function/VerifyAlreadyExist';

class UseCaseUser {
  async execute(userData: IUser) {
    const { numeroDeDocumento } = userData;
    console.log(numeroDeDocumento);
    const userRepository = getCustomRepository(UserRepository);

    const data = await userRepository.findOne({ where: { numeroDeDocumento } });
    console.log(data);
    const dataExist = VerifyAlreadyExist(data);

    if (dataExist !== vazio) {
      return proibido;
    }
    return ok;
  }
  catch(error) {
    console.log(error);
  }
}
export default new UseCaseUser();
