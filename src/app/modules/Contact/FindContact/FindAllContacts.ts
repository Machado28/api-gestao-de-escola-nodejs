import ContactRepository from '../../../../repositories/ContactRepository';
import { getCustomRepository } from 'typeorm';
import { indefinido, vazio } from '../../statusHTTP_Values';

class FindAllContacts {
  async execute(limit?: number) {
    const contactRepository = getCustomRepository(ContactRepository);

    let contact = await contactRepository.find();

    let limitLikeIndex = limit - 1;

    if (limitLikeIndex === vazio && limit !== 1) {
      return [];
    }
    if (limit === 1) limit += 1;

    limit !== indefinido &&
      (contact = contact.filter((contacts, index) => index <= limitLikeIndex && contacts));

    return contact;
  }
}
export default new FindAllContacts();
