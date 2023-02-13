import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>){}

    create(email: string, password:string, name:string, cep:string, cpf:string){
        const user = this.repo.create({email,password,name,cep,cpf});

        return this.repo.save(user);
    }

    findOne(id:number){
        return this.repo.findOneBy({id});
    }

    find(email: string){
        return this.repo.find({where: {email}});
    }

    async update(id: number, attrs: Partial <User>){
        const user = await this.findOne(id);
        if(!user){
            throw new Error('Usuário não encontrado');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
        
    }
        
    async remove(id: number){
        const user = await this.findOne(id);
        if(!user){
            throw new Error ('Usuário não encontrado');
        }
        return this.repo.remove(user);
    }
    
}