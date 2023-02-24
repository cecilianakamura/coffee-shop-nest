import { Expose } from "class-transformer";

export class OrderProductDto{

    @Expose()
    productId:number;

    @Expose()
    quantity: number;

}