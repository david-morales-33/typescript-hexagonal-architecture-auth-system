import path from 'path'
import dotenv from 'dotenv'

const envPath = path.join(__dirname, '../..', '.env');
envPath ? dotenv.config({ path: envPath }) : dotenv.config()

export class EnviromentConfig {
    public static createEnvConfig() {
        return {
            SERVER_PORT: EnviromentConfig.envValueValidator('SERVER_PORT'),
            DB_PORT: EnviromentConfig.envValueValidator('DB_PORT'),
            DB_HOST: EnviromentConfig.envValueValidator('DB_HOST'),
            DB_USER: EnviromentConfig.envValueValidator('DB_USER'),
            DB_PASSWORD: EnviromentConfig.envValueValidator('DB_PASSWORD'),
            DB_DATABASE: EnviromentConfig.envValueValidator('DB_DATABASE')
        }
    }
    private static envValueValidator(name: string): string {
        const value = process.env[name]
        if (!value)
            throw new Error(`La variable de entorno ${name}, no fue proporcionada`)
        return value;
    }
}