import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService){}

@Post()
@UseGuards(AdminGuard)
createProduct(@Body() body: CreateProductDto){
    return this.productsService.create(body);
}
}
