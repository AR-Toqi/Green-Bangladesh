import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

interface EnvConfig {
    PORT: string;
    DATABASE_URL: string;
}

const loadEnvVariables = (): EnvConfig => {
    const requireEnvVariable = [
        'PORT',
        'DATABASE_URL'
    ];

    requireEnvVariable.forEach((variable) => {
        if (!process.env[variable]) {
            throw new Error(`Environment variable ${variable} is required but not set in .env file.`);
        }
    });

    return {
        PORT: process.env.PORT as string,
        DATABASE_URL: process.env.DATABASE_URL as string,
    };
};

export const envConfig = loadEnvVariables();

