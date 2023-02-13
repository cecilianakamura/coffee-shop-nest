import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(Product) private repo:Repository<Product>){}

    create(){

    }
    
    findOne(id:number){
        return this.repo.findOneBy({id});
    }

    find(name: string){
        return this.repo.find({where: {name}});
    }

    async update(id:number, attrs: Partial<Product>){
        const product = await this.findOne(id);
        if(!product){
            throw new Error('Produto não encontrado');
        }
        Object.assign(product,attrs);
        return this.repo.save(product);
    }

    async remove(id:number){
        const product = await this.findOne(id);
        if(!product){
            throw new Error ('Produto não encontrado');
        }
        return this.repo.remove(product);
    }
}
