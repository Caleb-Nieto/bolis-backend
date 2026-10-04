import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BolisCategoryService } from './bolis-category.service.js';
import { UpdateBoliCategoryPriceDto } from './dto/update-boli-category-price.dto.js';

@ApiTags('bolis-category')
@Controller('bolis-category')
export class BolisCategoryController {
  constructor(private readonly bolisCategoryService: BolisCategoryService) {}

  // ─── UPDATE PRICE ─────────────────────────────────────────────────────────
  @Patch(':id/price')
  @ApiOperation({ summary: 'Update the price of a boli category' })
  @ApiParam({ name: 'id', type: Number, description: 'BoliCategory ID' })
  @ApiBody({ type: UpdateBoliCategoryPriceDto })
  @ApiResponse({
    status: 200,
    description: 'BoliCategory price updated successfully.',
  })
  @ApiNotFoundResponse({ description: 'BoliCategory not found.' })
  updatePrice(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePriceDto: UpdateBoliCategoryPriceDto,
  ) {
    return this.bolisCategoryService.updatePrice(id, updatePriceDto);
  }
}
