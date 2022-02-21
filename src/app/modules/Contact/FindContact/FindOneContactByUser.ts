import ContactRepository from '../../../../repositories/ContactRepository';
import { getCustomRepository } from 'typeorm';
import FindOneUserById from '../../User/FindUser/FindOneUserById';
import { indefinido } from '../../statusHTTP_Values';

class FindOneContactByUser {
  async execute(userId: string,contactId?:string,typeContact?:string) {

    const contactRepository = getCustomRepository(ContactRepository);

    const user = await FindOneUserById.execute(userId);
    let contact = await contactRepository.findOne({ where: { userId: user } });

    if(contactId!==indefinido)  contact = await contactRepository.findOne({ where: { userId: user,id:contactId } });


    return contact;
  }
}
export default new FindOneContactByUser();
