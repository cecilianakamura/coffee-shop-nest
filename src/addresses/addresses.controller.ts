import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { AddressesService } from './addresses.service';
import { Address } from './address.entity';

@Controller('addresses')
export class AddressesController {

    constructor(private addressesService: AddressesService){}

    @Get('/:postalcode')
    getAddress(@Param('postalcode') postalcode: string) : Promise<Address>{
        return this.addressesService.getAddress(postalcode);
    }

// @UseGuards(AuthGuard)
// @Get('/:id')
// async getAddressById(@Param('id') id: number, @CurrentUser() user:User){
//     const address = await this.addressesService.getAddress

// }

// @Put()
// async updateAddress(){

// }

}
