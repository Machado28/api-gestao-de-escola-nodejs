import UserRepository from '../../../../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';

class FindAllUsersOnSchool {
  async execute(idSchool: string) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.find(/*{ where: { idScholl } }*/);

    return user;
  }
}
export default new FindAllUsersOnSchool();
