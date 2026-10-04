import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoliCategory } from '../entities/bolis.category.entity.js';
import { UpdateBoliCategoryPriceDto } from './dto/update-boli-category-price.dto.js';

@Injectable()
export class BolisCategoryService {
  constructor(
    @InjectRepository(BoliCategory)
    private readonly boliCategoryRepository: Repository<BoliCategory>,
  ) {}

  async updatePrice(
    id: number,
    updatePriceDto: UpdateBoliCategoryPriceDto,
  ): Promise<BoliCategory> {
    const category = await this.boliCategoryRepository.findOne({
      where: { boliCategoryId: id },
    });

    if (!category) {
      throw new NotFoundException(`BoliCategory with ID ${id} not found`);
    }

    category.price = updatePriceDto.price;
    return this.boliCategoryRepository.save(category);
  }
}
