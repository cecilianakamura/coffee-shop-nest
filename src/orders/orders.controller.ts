import { Body, Controller, Post, UseGuards, Patch, Param, Put, Get, NotFoundException, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { OrderDto } from './dtos/order.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateOrderProductDto } from 'src/order-product/dtos/create-order-product.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { UpdateOrderProductDto } from 'src/order-product/dtos/update-order-product.dto';

@Controller('orders')
    // @Serialize(OrderDto)
export class OrdersController {

    constructor(private ordersService: OrdersService){}

    //cadastrar pedido associado a um usuário
    @Post()
    @UseGuards(AuthGuard)
    createOrder(@Body() body: CreateOrderProductDto, @CurrentUser() user: User){
        return this.ordersService.create(body,user);
    }

    //atualizar as infos de um pedido
    @Put('/info/:id')
    @UseGuards(AuthGuard)
    @Serialize(UpdateOrderDto)
    updateOrderInfo(@Param('id') id: string, @Body() body: UpdateOrderDto){
        return this.ordersService.updateInfo(parseInt(id), body);
    }

    //atualizar itens de um pedido
    @Put('/order/:idOrder/product/:idProduct')
    @UseGuards(AuthGuard)
    updateOrderItems(@Param('idOrder') idOrder: string, @Param('idProduct') idProduct: string, @Body() body: UpdateOrderProductDto, @CurrentUser() user: User){
        return this.ordersService.updateOrderProduct(parseInt(idOrder), parseInt(idProduct), body, user);
    }

    //@UseGuards(AdminGuard) TO DO: permissão apenas para o usuário do pedido e/ou admin
    @Get('/:id')
    async findOrderById(@Param('id') id: string) {
      //toda parte da URL é uma string
      const order = await this.ordersService.findOne(parseInt(id));
      if (!order) {
        throw new NotFoundException('Pedido não encontrado');
      }
      return order;
    }

    //buscar pedidos por status TO DO: buscar pedidos por status atrelado apenas ao usuário logado
    @UseGuards(AuthGuard)
    @Get('/status/:status')
    async findOrderByStatus(@Param('status') status: string, @CurrentUser() user: User) {
      const order = await this.ordersService.findOrderBy(status);
      if (!order) {
        throw new NotFoundException('Pedido não encontrado');
      }
      return order;
    }


    @UseGuards(AuthGuard)
    @Delete('/order/:idOrder/orderproduct/:idOrderProduct')
    async deleteOrderProduct(@Param('idOrder') idOrder: string, @Param('idOrderProduct') idOrderProduct: string, @CurrentUser() user: User){
      return this.ordersService.removeOrderProduct(parseInt(idOrder), parseInt(idOrderProduct), user);
    }


}
