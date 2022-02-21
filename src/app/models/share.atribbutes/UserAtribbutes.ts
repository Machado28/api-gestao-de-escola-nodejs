import { Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import DatesTableAtributtes from './DatesTableAtribbues';
import uuid from 'uuidv4'

abstract class UserAtribbutes extends DatesTableAtributtes {
  @PrimaryColumn({type:'uuid',default:uuid})
  id: string;

  @Column({ type: 'varchar', nullable: false, default: 'usuário do portal das escolas' })
  nome: string;

  @Column({ type: 'varchar', nullable: false, default: 'masculino' })
  genero: string;

  @Column({ type: 'varchar', nullable: true })
  numeroDeDocumento: string;

  @Column({ type: 'date', nullable: false, default: '2000-12-02' })
  dataDeNascimento: string;
}

export default UserAtribbutes;
