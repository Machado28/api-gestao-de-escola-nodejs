import 'reflect-metadata';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { uuid } from 'uuidv4';
import ComumAtributtes from './share.atribbutes/ComumAtributtes';
import User from './User';

const id=uuid()
@Entity('contact')
export default class Contact extends ComumAtributtes {
  @ManyToOne(() => User, user => user, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  userId: User;
}
