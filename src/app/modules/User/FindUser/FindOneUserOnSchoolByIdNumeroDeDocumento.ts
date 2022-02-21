import UserRepository from '../../../../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';

class FindOneUserOnSchoolByIdNumeroDeDocumento {
  async execute(numeroDeDocumento: string,idSchool:string) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ where: { numeroDeDocumento } });

    return user;
  }
}
export default new FindOneUserOnSchoolByIdNumeroDeDocumento();
