import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoliCategory } from '../entities/boli.category.entity.js';
import { BolisCategoryService } from './bolis-category.service.js';
import { BolisCategoryController } from './bolis-category.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([BoliCategory])],
  controllers: [BolisCategoryController],
  providers: [BolisCategoryService],
})
export class BolisCategoryModule {}
