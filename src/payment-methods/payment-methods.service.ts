import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from './payment-method.entity';
import { Repository } from 'typeorm';
import { CreatePaymentMethodDto } from './dtos/create-payment-method.dto';

@Injectable()
export class PaymentMethodsService {
    constructor(@InjectRepository(PaymentMethod) private repo: Repository<PaymentMethod>){}

    create(paymentMethodDto: CreatePaymentMethodDto){
        const paymentmethod = this.repo.create(paymentMethodDto);
        return this.repo.save(paymentmethod);
    }

    findOne(id:number){
        return this.repo.findOneBy({id});
    }

    find(method: string){
        return this.repo.find({where: {method}});
    }

    async update(id: number, attrs: Partial<PaymentMethod>){
        const pm = await this.findOne(id);
        if(!pm){
            throw new Error ('Método de pagamento não encontrado');
        }
        Object.assign(pm,attrs);
        return this.repo.save(pm);
    }

    async remove (id:number){
        const pm = await this.findOne(id);
        if(!pm){
            throw new Error ('Método de pagamento não encontrado');
        }
        return this.repo.remove(pm);
    }

}
