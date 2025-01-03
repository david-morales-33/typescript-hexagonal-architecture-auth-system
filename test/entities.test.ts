

import { TypeOrmClientFactory } from "../src/auth/Shared/infrastructure/Persistence/TypeORM/TypeOrmClientFactory";

async function main() {
    const connection = TypeOrmClientFactory.createClient({
        database: 'gestion_autenticacion_typeorm',
        username: 'sa',
        host: 'localhost',
        password: 'Sistemas-2020',
        port: 1433
    });
    try {

    } catch (error) {
        console.log(error);
    }
    finally {
        connection.destroy()
    }

}

main();
