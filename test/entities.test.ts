import { Role } from "../src/auth/Role/domain/Role";
import { RoleId } from "../src/auth/Role/domain/RoleId";
import { RoleLabel } from "../src/auth/Role/domain/RoleLabel";
import { Uuid } from "../src/auth/Shared/domain/value-objects/Uuid";
import { TypeOrmClientFactory } from "../src/auth/Shared/infrastructure/Persistence/TypeORM/TypeOrmClientFactory";
import { User } from "../src/auth/User/domain/User";
import { UserEmail } from "../src/auth/User/domain/UserEmail";
import { UserHashedPassword } from "../src/auth/User/domain/UserHashedPassword";
import { UserId } from "../src/auth/User/domain/UserId";
import { UserName } from "../src/auth/User/domain/UserName";
import { UserNickName } from "../src/auth/User/domain/UserNickName";


async function main() {
    const connection = TypeOrmClientFactory.createClient({
        database: 'gestion_autenticacion_typeorm',
        username: 'sa',
        host: 'localhost',
        password: 'Sistemas-2020',
        port: 1433
    });
    try {
        await connection.initialize();

        const userRepo = connection.getRepository("User");
        // const roleRepo = connection.getRepository("Role");
        // const response = await userRepo.find({relations:["roleList"]});
        const role1 = new Role(
            new RoleId(4),
            new RoleLabel("Usuario")
        )
        // const role2 = new Role(
        //     new RoleId(2),
        //     new RoleLabel("Invitado")
        // )
        // const role3 = new Role(
        //     new RoleId(3),
        //     new RoleLabel("Operario")
        // )

        // await roleRepo.save([role1, role2, role3]);

        // console.log(Uuid.random())
        const user = User.create(
            new UserId(Uuid.random().value),
            new UserName('Lucia Ramirez Zapata'),
            new UserEmail('Luci1254.2025@gmail.com'),
            new UserHashedPassword('ssfff-rcrtyyt-rrvt7ysx.xs'),
            [role1]
        );
        // console.log(user)
        await userRepo.save(user);
    } catch (error) {
        console.log(error);
    }
    finally {
        connection.destroy()
    }

}

main();