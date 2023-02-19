import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

    constructor(@InjectRepository(Category) private repo: Repository<Category>){}

    create(name:string){
        const category = this.repo.create({name});

        return this.repo.save(category);
    }

    findOne(id:number){
        return this.repo.findOneBy({id});
    }

    find(name: string){
        return this.repo.find({where: {name}});
    }

    async update(id:number, attrs: Partial<Category>){
        const category = await this.findOne(id);
        if(!category){
            throw new Error ('Categoria não encontrada');
        }
        Object.assign(category,attrs);
        return this.repo.save(category);
    }

    async remove(id:number){
        const category = await this.findOne(id);
        if(!category){
            throw new Error ('Categoria não encontrada');
        }
        return this.repo.remove(category);
    }
}
