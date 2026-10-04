import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boli } from './entities/bolis.entity.js';
import { BoliCategory } from './entities/bolis.category.entity.js';
import { BolisModule } from './bolis/bolis.module.js';
import { BolisCategoryModule } from './bolis-category/bolis-category.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-bdb-bolis-bd.c.aivencloud.com',
      port: 16725,
      username: 'avnadmin',
      password: 'AVNS_wZJXnIjTuBTtjbe0RHG',
      database: 'bolis_db',
      entities: [Boli, BoliCategory],
      synchronize: false,
    }),
    BolisModule,
    BolisCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
