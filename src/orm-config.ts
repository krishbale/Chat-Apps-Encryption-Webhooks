import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DATABASE } from './constant';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DATABASE.HOST,
  port: DATABASE.PORT,
  username: DATABASE.USERNAME,
  password: DATABASE.PASSWORD,
  database: DATABASE.NAME,
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'custom_migration_table',
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
} as TypeOrmModuleOptions;
