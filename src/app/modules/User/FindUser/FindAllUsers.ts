import UserRepository from '../../../../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import { indefinido, vazio } from '../../statusHTTP_Values';

class FindAllUsers {
  async execute(limit?: number) {
    const userRepository = getCustomRepository(UserRepository);

    let user = await userRepository.find();

    let limitLikeIndex = limit - 1;

    if (limitLikeIndex === vazio && limit !== 1) {
      return [];
    }
    if (limit === 1) limit += 1;

    limit !== indefinido &&
      (user = user.filter((users, index) => index <= limitLikeIndex && users));

    return user;
  }
}
export default new FindAllUsers();
