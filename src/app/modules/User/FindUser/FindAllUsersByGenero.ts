import UserRepository from '../../../../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import { indefinido, vazio } from '../../statusHTTP_Values';

class FindAllUsersByGenero {
  async execute(genero: string, limit?: number) {
    const userRepository = getCustomRepository(UserRepository);

    let user = await userRepository.find({ where: { genero } });
    let limitLikeIndex = limit - 1;


    if (limit === 1) limit += 1;

    limit !== indefinido &&
      (user = user.filter((users, index) => index <= limitLikeIndex && users));

    return user;
  }
}
export default new FindAllUsersByGenero();
