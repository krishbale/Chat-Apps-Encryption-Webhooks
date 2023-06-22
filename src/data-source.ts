import { DataSource, DataSourceOptions } from 'typeorm';
import { ormConfig} from './orm-config'
export const AppDataSource = new DataSource(ormConfig as DataSourceOptions);