import { Module } from '@nestjs/common';
import { OrderProductsController } from './order-products.controller';
import { OrderProduct } from './order-product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProductService } from './order-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderProduct])],
  controllers: [OrderProductsController],
  providers: [OrderProductService]
})
export class OrderProductsModule {}
