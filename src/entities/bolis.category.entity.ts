import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Boli } from './bolis.entity.js';

export enum Base {
    LECHE = "Leche",
    AGUA = "Agua",
}

@Entity("bolis_category")
export class BoliCategory {
  @PrimaryGeneratedColumn({name: 'boli_category_id'})
  boliCategoryId: number;
  @Column({
    name: 'category',
    type: 'enum',
    enum: Base,
    default: Base.LECHE,
  })
  base: Base;
  @Column()
  price: number;

  @OneToMany(()=> Boli, (boli) => boli.category)
  bolis: Boli[]
}
