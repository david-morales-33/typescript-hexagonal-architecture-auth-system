import { EntitySchema } from "typeorm";
import { Role } from "../../../../../Role/domain/Role";
import { ValueObjectTransformer } from "../../../../../Shared/infrastructure/Persistence/TypeORM/ValueObjectTransformer";
import { RoleId } from "../../../../../Role/domain/RoleId";
import { RoleLabel } from "../../../../../Role/domain/RoleLabel";

export const RoleEntity = new EntitySchema<Role>({
    name: 'Role',
    tableName: 'role',
    target: Role,
    columns: {
        id: {
            type: Number,
            primary: true,
            transformer: ValueObjectTransformer(RoleId)
        },
        label: {
            type: String,
            transformer: ValueObjectTransformer(RoleLabel)
        }
    }
})