import { Entity, OneToOne, JoinColumn, Column, PrimaryColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import DatesTableAtributtes from './share.atribbutes/DatesTableAtribbues';
import User from './User';
import Contact from './Contact';
import { uuid } from 'uuidv4';
import bcrypt from 'bcrypt'
const generateId = uuid();

@Entity('login')
export default class Login extends DatesTableAtributtes {
  @PrimaryColumn({ type: 'uuid', default: generateId })
  id: string;

  @OneToOne(() => User, userId => userId.id, {
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  userId: string;

  @OneToOne(() => Contact, contact => contact, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'contactId' })
  contactId: string;

  @Column({ name: 'password:', type: 'varchar', nullable: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hasPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
