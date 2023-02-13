import { Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {

    constructor(private usersService: UsersService, private authService: AuthService){}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto){
        return this.authService.signup(body.name, body.email, body.password, body.cpf, body.cep);
    }

    @Get('/:id')
    async findUser(@Param('id') id: string){//toda parte da URL é uma string
        const user = await this.usersService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException('Usuário não encontrado');
        }
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email:string){
        return this.usersService.find(email);
    }


    @Delete('/:id')
    removeUser(@Param('id') id:string){
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body:UpdateUserDto){
        return this.usersService.update(parseInt(id), body);
    }
}
