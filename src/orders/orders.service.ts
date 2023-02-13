import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Order) private repo: Repository<Order>){}

    create(){}

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
