import { DataSource } from 'typeorm';
import { TypeOrmConfig } from './TypeOrmConfig';

export class TypeOrmClientFactory {
    static async createClient(config: TypeOrmConfig): Promise<DataSource> {
        try {
            const connection = new DataSource({
                name: 'authentication',
                type: 'mssql',
                host: config.host,
                port: config.port,
                username: config.username,
                password: config.password,
                database: config.database,
                entities: [__dirname + '/../../../../User/infrastructure/Persistence/Typeorm/entities/*{.js,.ts}']
            });
            return await connection.initialize();
        } catch (error) {
            throw new Error('Data base connection faild: ' + error)
        }
    }
}
