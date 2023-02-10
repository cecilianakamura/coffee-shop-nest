import { IsEmail,IsString } from "class-validator";

export class CreateUserDto{

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    cpf: string;

    @IsString()
    cep: string;
}