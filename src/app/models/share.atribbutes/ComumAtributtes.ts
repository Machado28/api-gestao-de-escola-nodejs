import { Column, PrimaryGeneratedColumn } from "typeorm";
import DefaultDatesAtributtes from "./DatesTableAtribbues";

abstract class ComumAtributtes extends DefaultDatesAtributtes   {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:'varchar'})
  designacao:string;

  @Column({type:'varchar',default:'desconhecido'})
  descricao:string;
}
export default ComumAtributtes;
