import { Module } from '@nestjs/common';
import { OrderProductsController } from './order-products.controller';
import { OrderProductsService } from './order-products.service';
import { OrderProduct } from './order-product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderProduct])],
  controllers: [OrderProductsController],
  providers: [OrderProductsService]
})
export class OrderProductsModule {}
