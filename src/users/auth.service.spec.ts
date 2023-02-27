import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () =>{

  let service: AuthService; //pode ser referenciado em qualquer função
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => { //para cada teste, é gerado um fakeUsersService, testing module e instance do AuthService
  //Cópia de UsersService
  const users: User[] = [];
  fakeUsersService = { //partial tira obrigatoriedade de definir todos os métodos
    find: (email: string) => {
      const filteredUsers = users.filter(user => user.email === email);
      return Promise.resolve(filteredUsers);
    },
    create: (
      name: string,
      email: string,
      password: string,
      cpf: string,
      cep: string,
    ) => {
      const user = {id: Math.floor(Math.random()*9999), name, email, password, cpf, cep} as User;
      users.push(user);
      return Promise.resolve(user);
    },
  };
  
  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      {
        provide: UsersService,
        useValue: fakeUsersService,
      },
    ],
  }).compile();
  
    service = module.get(AuthService);
  });
  
  //testes
  it('can create an instance of auth service', async () => {

    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async()=>{
    const user = await service.signup('Julio Thiago Barros','julio.thiago.barros@santacasasjc.com.br','OR6e300Qmy','08587788744','35164335');

    expect(user.password).not.toEqual('OR6e300Qmy');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is already in use', async () => {
    await service.signup('Julio Thiago Barros','julio.thiago.barros@santacasasjc.com.br','OR6e300Qmy','08587788744','35164335');
    await expect(service.signup('Julio Thiago Barros','julio.thiago.barros@santacasasjc.com.br','KSO923hn','08587788744','00534697')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(
      service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws if an invalid password is provided', async () => {
    await service.signup('Teste','laskdjf@alskdfj.com', 'password','76591534265','46851232');
    await expect(
      service.signin('laskdjf@alskdfj.com', 'laksdlfkj'),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns as user if correct password is provided', async() => {
 await service.signup('Teste','asdf@asdf.com','aaaaaa','13245679845','65498735');

    const user = await service.signin('asdf@asdf.com','aaaaaa');
    expect(user).toBeDefined();
  });
});

