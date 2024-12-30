import { DbParameters, SQLServerRepository } from "../../../../Shared/infrastructure/Persistence/SQLServer/SQLServerRepository";
import { User } from "../../../domain/User";
import { UserEmail } from "../../../domain/UserEmail";
import { UserRepository } from "../../../domain/UserRepository";
import { RolePersistenceObject, SQLServerUserMapperDTO, UserPersistenceObject } from "../Mappers/SQLServerUserMapperDTO";
import sql from 'mssql'

export class SQLServerUserRepository extends SQLServerRepository implements UserRepository {

    async find(userId: UserEmail): Promise<User | null> {
        const params: DbParameters[] = [
            { name: 'email', type: sql.Char, value: userId.value }
        ];
        try {
            const executor = this.storedProcedure('sp_auth_user');
            const result = await executor(params);

            const roleList: RolePersistenceObject[] = result.map(entry => {
                return { rol_id: entry.rol_id, label: entry.label }
            });

            const user: UserPersistenceObject = {
                usr_id: result[0].usr_id,
                email: result[0].email,
                hashedPassword: result[0].hashedPassword,
                role: roleList
            }
            return SQLServerUserMapperDTO.convertFromPersistenceObject(user);
        }
        catch (error) { throw error }
        finally { this.disconnection() }
    }

    async save(user: User): Promise<void> {

    }
}