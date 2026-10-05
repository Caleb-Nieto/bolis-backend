import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boli } from '../entities/boli.entity.js';
import { BoliCategory } from '../entities/boli.category.entity.js';
import { CreateBoliDto } from './dto/create-boli.dto.js';
import { UpdateBoliDto } from './dto/update-boli.dto.js';

@Injectable()
export class BolisService {
  constructor(
    @InjectRepository(Boli)
    private readonly boliRepository: Repository<Boli>,
    @InjectRepository(BoliCategory)
    private readonly boliCategoryRepository: Repository<BoliCategory>,
  ) {}

  async create(createBoliDto: CreateBoliDto): Promise<Boli> {
    const category = await this.boliCategoryRepository.findOne({
      where: { boliCategoryId: createBoliDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException(
        `BoliCategory with ID ${createBoliDto.categoryId} not found`,
      );
    }

    const boli = this.boliRepository.create({
      flavour: createBoliDto.flavour,
      stockQuantity: createBoliDto.stockQuantity,
      category,
    });

    return this.boliRepository.save(boli);
  }

  async findAll(): Promise<Boli[]> {
    return this.boliRepository.find({
      relations: { category: true },
      order: { stockQuantity: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Boli> {
    const boli = await this.boliRepository.findOne({
      where: { boliId: id },
      relations: { category: true },
    });

    if (!boli) {
      throw new NotFoundException(`Boli with ID ${id} not found`);
    }

    return boli;
  }

  async update(id: number, updateBoliDto: UpdateBoliDto): Promise<Boli> {
    const boli = await this.findOne(id);

    if (updateBoliDto.categoryId !== undefined) {
      const category = await this.boliCategoryRepository.findOne({
        where: { boliCategoryId: updateBoliDto.categoryId },
      });

      if (!category) {
        throw new NotFoundException(
          `BoliCategory with ID ${updateBoliDto.categoryId} not found`,
        );
      }

      boli.category = category;
    }

    if (updateBoliDto.flavour !== undefined) {
      boli.flavour = updateBoliDto.flavour;
    }

    if (updateBoliDto.stockQuantity !== undefined) {
      boli.stockQuantity = updateBoliDto.stockQuantity;
    }

    return this.boliRepository.save(boli);
  }
}
