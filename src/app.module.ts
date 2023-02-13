import { Module } from "@nestjs/common";
import { ProductsModule } from "./products/products.module";
import { CategoriesModule } from "./categories/categories.module";
import { UsersModule } from "./users/users.module";
import { OrdersModule } from "./orders/orders.module";
import { PaymentMethodsModule } from "./payment-methods/payment-methods.module";
import { OrderProductsModule } from "./order-product/order-products.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./categories/category.entity";
import { User } from "./users/user.entity";
import { Product } from "./products/product.entity";
import { OrderProduct } from "./order-product/order-product.entity";
import { Order } from "./orders/order.entity";
import { PaymentMethod } from "./payment-methods/payment-method.entity";


@Module({
  imports: [TypeOrmModule.forRoot({
    type:'sqlite',
    database:'db_sqlite',
    entities: [User, Category, Product, OrderProduct, Order, PaymentMethod],
    synchronize: true,
  }),
  ProductsModule, 
  CategoriesModule, 
  UsersModule, 
  OrdersModule, 
  PaymentMethodsModule, 
  OrderProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
