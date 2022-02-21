import ContactRepository from '../../../../repositories/ContactRepository';
import { getCustomRepository } from 'typeorm';

class FindOneContactByDesignacao {
  async execute(designacao: string) {
    const contactRepository = getCustomRepository(ContactRepository);

    const contact = await contactRepository.findOne({ where: { designacao } });

    return contact;
  }
}
export default new FindOneContactByDesignacao();
