import UserRepository from '../../../../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';

class FindOneUserByNumeroDeDocumento {
  async execute(numeroDeDocumento: string) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ where: { numeroDeDocumento } });
     console.log('find=>',user)
    return user;
  }
}
export default new FindOneUserByNumeroDeDocumento();
