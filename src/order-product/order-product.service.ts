import { Injectable } from '@nestjs/common';
import { OrderProduct } from './order-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderProductDto } from './dtos/create-order-product.dto';

@Injectable()
export class OrderProductService {
    constructor(@InjectRepository(OrderProduct) private repo: Repository<OrderProduct>){}

    create(quantity: number){
        const orderproduct = this.repo.create({quantity});
        return this.repo.save(orderproduct);
    }

    findOne(id:number){
        return this.repo.findOneBy({id});
    }

//TO DO update, remove
    

}
