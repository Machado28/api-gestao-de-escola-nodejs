import { CreateDateColumn } from 'typeorm';

abstract class DatesTableAtributtes {
  @CreateDateColumn()
  createdAt: 'timestamp';

  @CreateDateColumn()
  updatedAt: 'timestamp';
}

export default DatesTableAtributtes;
