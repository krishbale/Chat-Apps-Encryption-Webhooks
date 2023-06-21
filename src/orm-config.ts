import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DATABASE } from "src/constant";
import { User } from "./user/entity/user.entity";

export const ormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: DATABASE.HOST,
    port: DATABASE.PORT,
    username: DATABASE.USERNAME,
    password: DATABASE.PASSWORD,
    database: DATABASE.NAME,
    synchronize: true,
   entities:[User],

} as TypeOrmModuleOptions;  

