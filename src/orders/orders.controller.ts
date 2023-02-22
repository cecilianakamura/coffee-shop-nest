import { Body, Controller, Post, UseGuards, Patch, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { OrderDto } from './dtos/order.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('orders')
export class OrdersController {

    constructor(private ordersService: OrdersService){}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(OrderDto)
    createOrder(@Body() body: CreateOrderDto, @CurrentUser() user: User){
        return this.ordersService.create(body,user);
    }
}
