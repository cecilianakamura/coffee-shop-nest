import { IsNumber, IsString } from "class-validator";
import { Order } from "src/orders/order.entity";

export class CreateOrderProductDto {

    @IsNumber()
    productId: number;

    @IsNumber()
    quantity: number;
    
}