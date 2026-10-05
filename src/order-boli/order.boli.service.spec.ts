import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderBoliService } from './order.boli.service.js';
import { DataSource } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

describe('OrderBoliService', () => {
  let service: OrderBoliService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const mockDataSource = {
      transaction: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderBoliService,
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<OrderBoliService>(OrderBoliService);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create an order successfully', async () => {
      const mockBoli = {
        boliId: 1,
        flavour: 'Fresa',
        stockQuantity: 10,
        category: { price: 20 },
      };

      const mockManager = {
        findOne: vi.fn().mockResolvedValue(mockBoli),
        save: vi.fn().mockImplementation((entity, obj) => {
          if (entity.name === 'Order') {
            return Promise.resolve({ ...obj, orderId: 1 });
          }
          return Promise.resolve(obj);
        }),
      };

      vi.spyOn(dataSource, 'transaction').mockImplementation(
        async (cb: any) => {
          return cb(mockManager);
        },
      );

      const dto = {
        shippingAddress: '123 Fake Street',
        items: [{ boliId: 1, quantity: 5 }],
      };

      const result = await service.createOrder(dto);

      expect(result).toBeDefined();
      expect(result.total).toBe(100); // 5 qty * 20 price
      expect(result.shippingAddress).toBe('123 Fake Street');
      expect(mockBoli.stockQuantity).toBe(5); // 10 - 5
      expect(mockManager.findOne).toHaveBeenCalled();
      expect(mockManager.save).toHaveBeenCalled();
    });

    it('should throw BadRequestException if boli not found', async () => {
      const mockManager = {
        findOne: vi.fn().mockResolvedValue(null),
      };

      vi.spyOn(dataSource, 'transaction').mockImplementation(
        async (cb: any) => {
          return cb(mockManager);
        },
      );

      const dto = {
        shippingAddress: '123 Fake Street',
        items: [{ boliId: 99, quantity: 5 }],
      };

      await expect(service.createOrder(dto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if stock is insufficient', async () => {
      const mockBoli = {
        boliId: 1,
        flavour: 'Fresa',
        stockQuantity: 2, // Only 2 in stock
        category: { price: 20 },
      };

      const mockManager = {
        findOne: vi.fn().mockResolvedValue(mockBoli),
      };

      vi.spyOn(dataSource, 'transaction').mockImplementation(
        async (cb: any) => {
          return cb(mockManager);
        },
      );

      const dto = {
        shippingAddress: '123 Fake Street',
        items: [{ boliId: 1, quantity: 5 }],
      };

      await expect(service.createOrder(dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
