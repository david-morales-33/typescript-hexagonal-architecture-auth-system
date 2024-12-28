import { ConnectionPool, config as SQLServerConfig } from 'mssql';

export class SQLServerPoolFactory {
    public static async createAndConnectPool(config: SQLServerConfig): Promise<ConnectionPool> {
        const pool = new ConnectionPool(config);
        await pool.connect();
        return pool;
    }
}
