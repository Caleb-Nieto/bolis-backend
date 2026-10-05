import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoliCategoryPriceDto {
  @ApiProperty({
    example: 15.5,
    description: 'New price for the boli category',
  })
  price: number;
}
