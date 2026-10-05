import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty({ example: 1, description: 'ID of the boli' })
  boliId: number;

  @ApiProperty({ example: 5, description: 'Quantity to order' })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: '123 Fake Street', description: 'Shipping address' })
  shippingAddress: string;

  @ApiProperty({ type: [OrderItemDto], description: 'List of items to order' })
  items: OrderItemDto[];
}
