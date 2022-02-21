import UserRepository from '../../../../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import { indefinido } from '../../statusHTTP_Values';

class FindAllUsersOnSchoolByGenero {
  async execute(genero: string, idSchool, limit?: number) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.find({ where: { genero } });
    let users = user;

    limit !== indefinido && (users = user.filter((users, index) => index <= limit && users));
    return users;
  }
}
export default new FindAllUsersOnSchoolByGenero();
