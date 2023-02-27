import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { OrderProduct } from 'src/order-product/order-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), 
  TypeOrmModule.forFeature([Product]), 
  TypeOrmModule.forFeature([OrderProduct])
],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
