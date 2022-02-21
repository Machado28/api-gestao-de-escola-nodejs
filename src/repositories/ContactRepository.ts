import { EntityRepository, Repository } from 'typeorm';
import Contact from '../app/models/Contact';

@EntityRepository(Contact)
export default class ContactRepository extends Repository<Contact> {}
