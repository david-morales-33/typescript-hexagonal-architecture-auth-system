import { EntitySchema } from "typeorm";
import { UserDTO } from "../../../domain/UserDTO";

export const UserEntity = new EntitySchema<UserDTO>({
    name: 'User',
    tableName: 'tbl_user',
    target: UserDTO,
    columns: {
        id: {
            type: String,
            primary: true,
            name: 'usr_id'
        },
        name: {
            type: String,
            name: 'usr_name'
        },
        email: {
            type: String,
            name: 'usr_email'
        },
        nickName: {
            type: String,
            name: 'usr_nick_name'
        },
        hashedPassword: {
            type: String,
            name: 'usr_hashed_password'
        }
    },
    relations: {
        roleList: {
            type: 'many-to-many',
            target: 'Role',
            joinTable: {
                name: 'tbl_user_x_role',
                joinColumn: {
                    referencedColumnName: 'id',
                    name: 'usr_id'
                },
                inverseJoinColumn: {
                    referencedColumnName: 'id',
                    name: 'rol_id'
                }
            },
            cascade: true
        },
    }
})