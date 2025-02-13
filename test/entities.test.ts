import { containerPromise } from "../src/server/dependency-injection";

async function main() {
    try {
       const container = await containerPromise;
       const ent = container.get('Auth.Shared.TypeOrmClientFactory');
       console.log(ent) 
    } catch (error) {
        console.log(error);
    }
}
main();