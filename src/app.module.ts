import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { OrderItemsModule } from './order-items/order-items.module';

@Module({
  imports: [ProductsModule, CategoriesModule, UsersModule, OrdersModule, PaymentMethodsModule, OrderItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
