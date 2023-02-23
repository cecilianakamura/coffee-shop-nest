import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreatePaymentMethodDto } from './dtos/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dtos/update-payment-method.dto';

@Controller('payment-methods')
export class PaymentMethodsController {
    constructor (private paymentMethodsService: PaymentMethodsService){}

    @Post('/')
    @UseGuards(AdminGuard)
    createPaymentMethod (@Body() body: CreatePaymentMethodDto ){
        const paymentmethod = this.paymentMethodsService.create(body);
    
        return paymentmethod;
    }
    
    @Get('/:id')
    async findPaymentMethod(@Param('id') id: string) {
      //toda parte da URL é uma string
      const paymentmethod = await this.paymentMethodsService.findOne(parseInt(id));
      if (!paymentmethod) {
        throw new NotFoundException('Método de pagamento não encontrado');
      }
      return paymentmethod;
    }
    
    
    @Get()
    findAllPaymentMethods(@Query('name') name: string) {
      return this.paymentMethodsService.find(name);
    }
    
    @Patch('/:id')
    updatePaymentMethod(@Param('id') id: string, @Body() body: UpdatePaymentMethodDto) {
      return this.paymentMethodsService.update(parseInt(id), body);
    }
    
    @Delete('/:id')
    removePaymentMethod(@Param('id') id: string) {
      return this.paymentMethodsService.remove(parseInt(id));
    }
}
