import { MiddlewareConsumer, Module, ValidationPipe } from "@nestjs/common";
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
import { APP_PIPE } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AddressesModule } from './addresses/addresses.module';

const cookieSession = require('cookie-session'); //importação incompativel com tsconfig

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          synchronize: true, //TO DO mudar p/ false em prod
          entities:[User, Product, Category, Order, OrderProduct, PaymentMethod]
        };
      }
    }),

   /* TypeOrmModule.forRoot({
    type:'sqlite',
    database: 'db.sqlite',
    entities: [User, Category, Product, OrderProduct, Order, PaymentMethod],
    synchronize: true,
  }),*/
  ProductsModule, 
  CategoriesModule, 
  UsersModule, 
  OrdersModule, 
  PaymentMethodsModule, 
  OrderProductsModule, AddressesModule
],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true //If set to true, validator will strip validated (returned) object of any properties that do not use any validation decorators.
      }),
    }
  ],
})
export class AppModule {

  constructor(
    private configService : ConfigService
  ){}

  configure(consumer: MiddlewareConsumer ){
     consumer.apply( cookieSession({
        keys: [this.configService.get('COOKIE_KEY')],
      }))
      .forRoutes('*');
  }
}
