import UserRepository from '../../../../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';

class FindOneUserOnSchoolById {
  async execute(id: string, idSchool: string) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ where: { id } });

    return user;
  }
}
export default new FindOneUserOnSchoolById();
