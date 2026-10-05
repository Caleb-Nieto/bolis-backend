import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boli } from '../entities/boli.entity.js';
import { BoliCategory } from '../entities/boli.category.entity.js';
import { BolisService } from './bolis.service.js';
import { BolisController } from './bolis.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Boli, BoliCategory])],
  controllers: [BolisController],
  providers: [BolisService],
})
export class BolisModule {}
