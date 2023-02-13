import { Injectable } from '@nestjs/common';
import { OrderProduct } from './order-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderProductService {
    constructor(@InjectRepository(OrderProduct) private repo: Repository<OrderProduct>){}

    create(){}

    findOne(id:number){
        return this.repo.findOneBy({id});
    }

    

}
