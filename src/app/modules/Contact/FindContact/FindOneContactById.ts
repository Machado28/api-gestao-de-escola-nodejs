import ContactRepository from '../../../../repositories/ContactRepository';
import { getCustomRepository } from 'typeorm';

class FindOneContactById {
  async execute(id: string) {
    const contactRepository = getCustomRepository(ContactRepository);

    const contact = await contactRepository.findOne({ where: { id } });

    return contact;
  }
}
export default new FindOneContactById();
