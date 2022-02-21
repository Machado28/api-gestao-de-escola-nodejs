import 'reflect-metadata';
import { Entity } from 'typeorm';
import UserAtribbutes from './share.atribbutes/UserAtribbutes';

@Entity('user')
class User extends UserAtribbutes {}
export default User;
