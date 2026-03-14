import app from './app';
import { envConfig } from './config';

async function main() {
    try {
        const server = app.listen(envConfig.PORT, () => {
            console.log(`Server is running on port ${envConfig.PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

main();
