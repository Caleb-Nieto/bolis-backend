import { ApiProperty } from '@nestjs/swagger';

export class CreateBoliDto {
  @ApiProperty({ example: 'Fresa', description: 'Flavour of the boli' })
  flavour: string;

  @ApiProperty({ example: 1, description: 'Category ID this boli belongs to' })
  categoryId: number;

  @ApiProperty({ example: 50, description: 'Current stock quantity' })
  stockQuantity: number;
}
