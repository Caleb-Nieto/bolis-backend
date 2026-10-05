import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoliCategory } from './boli.category.entity.js';
import { OrderBoli } from './order.boli.entity.js';

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

  @OneToMany(() => OrderBoli, (orderBoli) => orderBoli.boliId)
  orderBoli: OrderBoli[];
}
