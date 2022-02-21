import UserRepository from '../../../../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';

class FindOneUserById {
  async execute(id: string) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ where: { id } });

    return user;
  }
}
export default new FindOneUserById();
