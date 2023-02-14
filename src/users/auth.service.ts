import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt); //permite utilizar promise ao invés de callbacks (scrypt)


@Injectable()
export class AuthService{
    constructor(private usersService: UsersService){}

    async signup(name: string, email: string, password: string, cpf: string, cep: string){
        //checa se o e-mail já foi utilizado

        const users = await this.usersService.find(email);
        if(users.length){
            throw new BadRequestException('E-mail já cadastrado');
        }

        //criptografa senha

        //gera salt
        const salt = randomBytes(8).toString('hex');
        //1 byte = 2 caracteres

        //criptografa senha+salt
        const hash = (await scrypt(password, salt, 32)) as Buffer;


        //junta o resultado + salt 
        const result = salt +'.' + hash.toString('hex');

        //cria novo usuário e persiste
        const user = await this.usersService.create(name,email,result,cpf,cep);

        //retorna usuário
        return user;

    }

    async signin(email: string, password:string){
        const [user] = await this.usersService.find(email);
    if(!user){
        throw new NotFoundException('Usuário não encontrado');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password,salt,32)) as Buffer;
    if(storedHash !== hash.toString('hex')){
        throw new BadRequestException('Dados inválidos');
    }

    return user;

    }
}