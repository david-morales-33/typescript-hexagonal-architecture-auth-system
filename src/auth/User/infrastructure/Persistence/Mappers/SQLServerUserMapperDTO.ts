import { Role } from "../../../../Role/domain/Role"
import { RoleId } from "../../../../Role/domain/RoleId"
import { RoleLabel } from "../../../../Role/domain/RoleLabel"
import { User } from "../../../domain/User"
import { UserEmail } from "../../../domain/UserEmail"
import { UserHashedPassword } from "../../../domain/UserHashedPassword"
import { UserId } from "../../../domain/UserId"

export interface RolePersistenceObject {
    rol_id: number;
    label: string;
}

export interface UserPersistenceObject {
    usr_id: string,
    email: string,
    hashedPassword: string,
    role: RolePersistenceObject[]
}

export class SQLServerUserMapperDTO {
    public static convertFromPersistenceObject(entity: UserPersistenceObject): User {
        return new User(
            new UserId(entity.usr_id),
            new UserEmail(entity.email),
            entity.role.map(entry => new Role(new RoleId(entry.rol_id), new RoleLabel(entry.label))),
            new UserHashedPassword(entity.hashedPassword)
        )
    }
}