import { EnviromentConfig } from "../../../../../server/EnviromentConfig";
import { TypeOrmConfig } from "./TypeOrmConfig";

export class TypeOrmConfigFactory {
    public static createConfig(): TypeOrmConfig {
        const env = EnviromentConfig.createEnvConfig();
        return {
            host: env.DB_HOST,
            username: env.DB_USER,
            password: env.DB_PASSWORD,
            database: env.DB_DATABASE,
            port: parseInt(env.DB_PORT)
        }
    }
}