import { Controller } from '@nestjs/common';
import { OrderProductService } from './order-product.service';

@Controller('order-products')
export class OrderProductsController {
    constructor (private orderProdService: OrderProductService){}
}
