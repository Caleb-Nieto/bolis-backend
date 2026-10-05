import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderBoli } from '../entities/order.boli.entity.js';
import { Order } from '../entities/order.entity.js';
import { Boli } from '../entities/boli.entity.js';
import { OrderBoliController } from './order.boli.controller.js';
import { OrderBoliService } from './order.boli.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([OrderBoli, Order, Boli])],
  controllers: [OrderBoliController],
  providers: [OrderBoliService],
})
export class OrderBoliModule {}
