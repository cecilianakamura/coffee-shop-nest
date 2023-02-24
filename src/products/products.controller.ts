import { Controller, Post, Get, Body, UseGuards, Param, NotFoundException, Query, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService){}

@Post()
@UseGuards(AdminGuard)
createProduct(@Body() body: CreateProductDto){
    return this.productsService.create(body);
}

@Get('/:id')
async findProduct(@Param('id') id: string){
    const product = await this.productsService.findOne(parseInt(id));

    if(!product){
        throw new NotFoundException('Produto não encontrado');
    }

    return product;

}

@Get()
findAllProducts(@Query('description') description: string) {
  return this.productsService.find(description);
}

@Patch('/:id')
updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
  return this.productsService.update(parseInt(id), body);
}

@Delete('/:id')
removeProduct(@Param('id') id: string) {
  return this.productsService.remove(parseInt(id));
}

}
