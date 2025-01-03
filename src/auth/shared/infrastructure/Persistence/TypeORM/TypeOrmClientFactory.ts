import { DataSource } from 'typeorm';
import { TypeOrmConfig } from './TypeOrmConfig';
import { UserEntity } from '../../../../User/infrastructure/Persistence/Typeorm/entities/UserEntity';
import { RoleEntity } from '../../../../User/infrastructure/Persistence/Typeorm/entities/RoleEntity';

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
                entities: [UserEntity, RoleEntity],
                synchronize: true
            });
            return connection;
        } catch (error) {
            throw new Error('Data base connection faild: ' + error)
        }
    }
}
