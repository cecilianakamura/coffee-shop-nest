import { IsString } from "class-validator";

export class CreatePaymentMethodDto{

    @IsString()
    method: string;

}