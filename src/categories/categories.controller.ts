import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CategoryDto } from './dtos/category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { AdminGuard } from 'src/guards/admin.guard';
@Controller('categories')
@Serialize(CategoryDto)
export class CategoriesController {

    constructor(private categoriesService: CategoriesService){}

@Post()
@UseGuards(AdminGuard)
createCategory (@Body() body: CreateCategoryDto ){
    return this.categoriesService.create(body);
}

@Get('/:id')
async findCategory(@Param('id') id: string) {
  //toda parte da URL é uma string
  const category = await this.categoriesService.findOne(parseInt(id));
  if (!category) {
    throw new NotFoundException('Categoria não encontrada');
  }
  return category;
}


@Get()
findAllCategories(@Query('name') name: string) {
  return this.categoriesService.find(name);
}

@Patch('/:id')
updateCategory(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
  return this.categoriesService.update(parseInt(id), body);
}

@Delete('/:id')
removeCategory(@Param('id') id: string) {
  return this.categoriesService.remove(parseInt(id));
}

}
