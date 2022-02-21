import { EntityRepository, Repository } from 'typeorm';
import User from '../app/models/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {}
