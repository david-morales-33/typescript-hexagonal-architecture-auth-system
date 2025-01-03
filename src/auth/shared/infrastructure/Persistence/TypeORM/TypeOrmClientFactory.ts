import { DataSource } from 'typeorm';
import { TypeOrmConfig } from './TypeOrmConfig';

export class TypeOrmClientFactory {
    static createClient(config: TypeOrmConfig): DataSource {
        try {
            const connection = new DataSource({
                name: 'authentication',
                type: 'mssql',
                host: config.host,
                port: config.port,
                username: config.username,
                password: config.password,
                database: config.database,
                options: {
                    encrypt: true,
                    trustServerCertificate: true
                },
                entities: [],
                synchronize: true,
            });
            return connection;
        } catch (error) {
            throw new Error('Data base connection faild: ' + error)
        }
    }
}
