import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>){}

    create(name:string, email: string, password:string,cpf:string,cep:string){
        const user = this.repo.create({name,email,password,cpf,cep});

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
            throw new NotFoundException('Usuário não encontrado');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
        
    }
        
    async remove(id: number){
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException('Usuário não encontrado');
        }
        return this.repo.remove(user);
    }
    
}