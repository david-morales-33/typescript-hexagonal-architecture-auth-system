import { EntitySchema } from "typeorm";
import { RoleDTO } from "../../../../domain/RoleDTO";

export const RoleEntity = new EntitySchema<RoleDTO>({
    name: 'Role',
    tableName: 'tbl_role',
    target: RoleDTO,
    columns: {
        id: {
            type: Number,
            name: 'rol_id',
            primary: true
        },
        label: {
            type: String,
            name: 'rol_name'
        }
    }
})