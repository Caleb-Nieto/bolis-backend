import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderBoliService } from './order.boli.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';

@ApiTags('orders')
@Controller('orders')
export class OrderBoliController {
  constructor(private readonly orderBoliService: OrderBoliService) {}

  @Post()
  @ApiOperation({ summary: 'Place a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderBoliService.createOrder(createOrderDto);
  }
}
