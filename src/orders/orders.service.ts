import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Order) private repo: Repository<Order>){}

    create(orderDto: CreateOrderDto, user: User){
        const order = this.repo.create(orderDto);
        order.user = user; //user associado ao pedido

        return this.repo.save(order);
    }

    findOne(id:number){
        return this.repo.findOneBy({id});
    }

    find(status:string){
        return this.repo.find({where: {status}});
    }

    async update(id:number, attrs: Partial<Order>){
        const order = await this.findOne(id);
        if(!order){
            throw new Error ('Pedido não encontrado');
        }
        Object.assign(order,attrs);
        return this.repo.save(order);
    }

    async remove(id:number){
        const order = await this.findOne(id);
        if(!order){
            throw new Error ('Pedido não encontrado');
        }
        return this.repo.remove(order);
    }
}
