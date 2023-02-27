import { IsObject, IsOptional, IsString } from "class-validator";

export class UpdateOrderDto{

    @IsOptional()
    @IsString()
    status: string;

    @IsObject()
    @IsOptional()
    address: object;
  
    @IsString()
    @IsOptional()
    paymentMethod: string;
    
    
}