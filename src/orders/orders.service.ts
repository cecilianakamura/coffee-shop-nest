import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { CreateOrderProductDto } from 'src/order-product/dtos/create-order-product.dto';
import { Product } from 'src/products/product.entity';
import { OrderProduct } from 'src/order-product/order-product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private repoOrder: Repository<Order>,
    @InjectRepository(Product) private repoProduct: Repository<Product>,
    @InjectRepository(OrderProduct)
    private repoOrderProduct: Repository<OrderProduct>,
  ) {}

  async create(orderProductDto: CreateOrderProductDto, user: User) {
    // orderProductDto = {
    //     productId: 1,
    //     quantity:10
    // }
    const product = await this.repoProduct.findOne({
      where: {
        id: orderProductDto.productId,
      },
    });

    const orderproduct = await this.repoOrderProduct.save({
      product,
      quantity: orderProductDto.quantity,
    });

    const order = await this.repoOrder.save({
      orderproducts: [orderproduct],
      user,
    });

    this.repoOrderProduct.update(orderproduct.id, { order: order });

    return await this.repoOrder.findOne({
      where: {
        id: order.id,
      },
      relations: ['orderproducts', 'orderproducts.product', 'user'],
    });
  }

  findOne(id: number) {
    return this.repoOrder.findOneBy({ id });
  }

  findOrderBy(status: string) {
    return this.repoOrder.find({ where: { status } });
  }

  async updateInfo(id: number, attrs: Partial<Order>) {
    const order = await this.repoOrder.findOneBy({id});
    if (!order) {
      throw new Error('Pedido não encontrado');
    }
    Object.assign(order, attrs);
    return this.repoOrder.save(order);
  }

  async updateOrderProduct(orderId: number, productId: number, attrsOrderProduct: Partial<OrderProduct>, user: User) {
    const product = await this.repoProduct.findOneBy({id:productId});
    const order = await this.repoOrder.findOne({
      where: {
        id: orderId,
        user: {id:user.id}
      }})
    if(!product || !order){
        throw new Error ('Produto ou carrinho não encontrados');
    }
    
     // SELECT * FROM orderproduct WHERE product = product AND order = order
    const orderProductExist = await this.repoOrderProduct.findOne({
      where:{
        product: {id: productId},
        order: {id: order.id}
      }
    })
    if(orderProductExist){

      // Object.assign(orderProductExist, attrsOrderProduct);

      await this.repoOrderProduct.update(orderProductExist.id, { quantity:attrsOrderProduct.quantity });


      
      const orderUpdated = await this.repoOrder.findOne({
        where: {
          id: orderId,
        },
        relations: ['orderproducts', 'orderproducts.product', 'user'],
      })

      return orderUpdated

    }else{

      const orderProductNew = new OrderProduct()

      orderProductNew.order = order
      orderProductNew.product = product

      Object.assign(orderProductNew, attrsOrderProduct);
     

      await this.repoOrderProduct.save(orderProductNew);

      const orderUpdated = await this.repoOrder.findOne({
        where: {
          id: orderId,
        },
        relations: ['orderproducts', 'orderproducts.product', 'user'],
      })

      return orderUpdated;

    }
    
  }

  async removeOrderProduct(idOrder: number, idOrderProduct: number, user: User){
    const order = await this.repoOrder.findOne({
      where: {
        id: idOrder,
        user: {id:user.id}
      }})

      console.log(order)
      
    const orderproduct =  await this.repoOrderProduct.findOne({
      where: {
        id: idOrderProduct,
        order: {id: order.id}
      }})  

      console.log(orderproduct)

      if(order || orderproduct){
        
      await this.repoOrderProduct.remove(orderproduct)


      const orderUpdated = await this.repoOrder.findOne({
        where: {
          id: idOrder,
        },
        relations: ['orderproducts', 'orderproducts.product', 'user'],
      })

      return orderUpdated
      } else {
            throw new Error('Pedido ou item não encontrado');
      }

  }

  // async remove(id: number) {
  //   const order = await this.findOne(id); 
  //   if (!order) {
  //     throw new Error('Pedido não encontrado');
  //   }
  //   return this.repoOrder.remove(order);
  // }

}
