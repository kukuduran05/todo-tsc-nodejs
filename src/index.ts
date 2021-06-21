import { App } from './app';
import * as dotenv from 'dotenv';

async function main() {
    dotenv.config();
    if (!process.env.PORT) {
        console.log(`Error to get ports`);
        process.exit(1);
    }
    const PORT: number = parseInt(process.env.PORT as string, 10);
    const app = new App(PORT);
    await app.listen();
}

main();