import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBoliDto {
  @ApiPropertyOptional({ example: 'Mango', description: 'Flavour of the boli' })
  flavour?: string;

  @ApiPropertyOptional({
    example: 2,
    description: 'Category ID this boli belongs to',
  })
  categoryId?: number;

  @ApiPropertyOptional({ example: 30, description: 'Current stock quantity' })
  addToStock?: number;
}
