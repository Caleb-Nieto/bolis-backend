import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderBoli } from './order.boli.entity.js';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn({ name: 'order_id' })
  orderId: number;
  @Column()
  total: number;
  @Column({ name: 'shipping_address' })
  shippingAddress: string;
  @Column({ name: 'order_date' })
  orderDate: Date;

  @OneToMany(() => OrderBoli, (orderBoli) => orderBoli.orderId)
  orderBoli: OrderBoli[];
}
