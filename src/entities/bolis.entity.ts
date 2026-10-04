import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoliCategory } from './bolis.category.entity.js';

@Entity('bolis')
export class Boli {
  @PrimaryGeneratedColumn({ name: 'boli_id' })
  boliId: number;
  @Column()
  flavour: string;

  @ManyToOne(() => BoliCategory, (boliCategory) => boliCategory.bolis)
  @JoinColumn({ name: 'bolis_category_id' })
  category: BoliCategory;

  @Column({ name: 'stock_quantity' })
  stockQuantity: number;
  @Column({ name: 'unit_production_cost' })
  unitProductionCost: number;
}