import { rm } from "fs/promises";
import { join } from "path";

//deleta a db de teste antes de cada teste
global.beforeEach(async () => {
    try{
        await rm(join(__dirname, '..', 'test.sqlite'))
    } catch (err) { }
    
} );