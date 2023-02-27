import {Injectable} from '@nestjs/common';
import axios from 'axios';
import { Address } from './address.entity';

@Injectable()
export class AddressesService {

    async getAddress(postalCode: string){
        const res = await axios.get(`http://viacep.com.br/ws/${postalCode}/json/`);

        const address: Address = {
            postalCode: res.data.cep,
            street: res.data.logradouro,
            complement: res.data.complemento,
            district: res.data.bairro,
            city: res.data.localidade,
            state: res.data.uf,
          };
          return address;
        }

    // async updateAddress(){}

}