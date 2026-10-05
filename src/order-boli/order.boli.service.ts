import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Order } from '../entities/order.entity.js';
import { OrderBoli } from '../entities/order.boli.entity.js';
import { Boli } from '../entities/boli.entity.js';
import { CreateOrderDto } from './dto/create-order.dto.js';

@Injectable()
export class OrderBoliService {
  constructor(private readonly dataSource: DataSource) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { shippingAddress, items } = createOrderDto;

    return this.dataSource.transaction(async (manager) => {
      let total = 0;
      const orderBoliItems: OrderBoli[] = [];

      for (const item of items) {
        // Fetch Boli with its category to get the price
        const boli = await manager.findOne(Boli, {
          where: { boliId: item.boliId },
          relations: { category: true },
        });

        if (!boli) {
          throw new BadRequestException(
            `Boli with ID ${item.boliId} not found`,
          );
        }

        if (boli.stockQuantity < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for Boli ${boli.flavour}`,
          );
        }

        // Calculate cost based on price in boli category
        const unitPrice = boli.category.price;
        const itemTotal = unitPrice * item.quantity;
        total += itemTotal;

        // Update stock
        boli.stockQuantity -= item.quantity;
        await manager.save(Boli, boli);

        // Prepare OrderBoli pivot entity
        const orderBoli = new OrderBoli();
        orderBoli.boliId = boli.boliId;
        orderBoli.quantity = item.quantity;
        orderBoli.unitPrice = unitPrice; // Preserve unit price historically
        orderBoliItems.push(orderBoli);
      }

      // Generate orderDate based on Mexico City time
      const mxDateString = new Date().toLocaleString('en-US', {
        timeZone: 'America/Mexico_City',
      });
      const orderDate = new Date(mxDateString);

      // Create Order
      const order = new Order();
      order.shippingAddress = shippingAddress;
      order.total = total;
      order.orderDate = orderDate;

      const savedOrder = await manager.save(Order, order);

      // Save pivot entities
      for (const ob of orderBoliItems) {
        ob.orderId = savedOrder.orderId;
        await manager.save(OrderBoli, ob);
      }

      // Attach items for the response
      savedOrder.orderBoli = orderBoliItems;
      return savedOrder;
    });
  }
}
