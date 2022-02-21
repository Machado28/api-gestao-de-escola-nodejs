import { Repository, getCustomRepository, ObjectType } from 'typeorm';

export async function FindAllOnTable (customRepository) {
  var existeData = await customRepository.find();
  console.log('findAll in data base is fine! ');
  return existeData;
};
