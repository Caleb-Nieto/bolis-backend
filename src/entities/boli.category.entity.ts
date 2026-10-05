import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Boli } from './boli.entity.js';

export enum Category {
  LECHE = 'Leche',
  AGUA = 'Agua',
}

@Entity('bolis_category')
export class BoliCategory {
  @PrimaryGeneratedColumn({ name: 'boli_category_id' })
  boliCategoryId: number;
  @Column({
    name: 'category',
    type: 'enum',
    enum: Category,
    default: Category.LECHE,
  })
  category: Category;
  @Column()
  price: number;

  @OneToMany(() => Boli, (boli) => boli.category)
  bolis: Boli[];
}
