import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Order } from './order.entity.js';
import { Boli } from './boli.entity.js';

@Entity('order_boli')
export class OrderBoli {
  @PrimaryColumn({ name: 'order_id' })
  @ManyToOne(() => Order, (order) => order.orderBoli)
  @JoinColumn({ name: 'order_id' })
  orderId: number;
  @PrimaryColumn({ name: 'boli_id' })
  @ManyToOne(() => Boli, (boli) => boli.orderBoli)
  @JoinColumn({ name: 'boli_id' })
  boliId: number;
  @Column()
  quantity: number;
  @Column({ name: 'unit_price' })
  unitPrice: number;
}
