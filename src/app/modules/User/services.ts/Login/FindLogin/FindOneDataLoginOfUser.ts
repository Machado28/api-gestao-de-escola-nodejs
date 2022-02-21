import LoginRepository from '../../../../../../repositories/LoginRepository';
import { getCustomRepository } from 'typeorm';

class FindOneDataOfUserLogin {
  async execute(userId: string) {
    const loginRepository = getCustomRepository(LoginRepository);

    const Login = await loginRepository.findOne({ where: { userId } });

    return Login;
  }
}
export default new FindOneDataOfUserLogin();
