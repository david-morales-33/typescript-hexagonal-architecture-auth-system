import { ConnectionPool, config as SQLServerConfig } from 'mssql';

export class SQLServerPoolFactory {
    public static async createPool(config: SQLServerConfig): Promise<ConnectionPool> {
        const pool = new ConnectionPool(config);
        return pool;
    }
}
