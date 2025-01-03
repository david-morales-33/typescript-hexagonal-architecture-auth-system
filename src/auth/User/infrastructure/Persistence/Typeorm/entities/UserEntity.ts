import { EntitySchema } from 'typeorm'
import { User } from '../../../../domain/User'
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/Persistence/TypeORM/ValueObjectTransformer'
import { UserId } from '../../../../domain/UserId'
import { UserEmail } from '../../../../domain/UserEmail'
import { UserHashedPassword } from '../../../../domain/UserHashedPassword'
import { UserName } from '../../../../domain/UserName'
import { UserNickName } from '../../../../domain/UserNickName'

export const UserEntity = new EntitySchema<User>({
    name: 'User',
    tableName: 'tbl_user',
    target: User,
    columns: {
        id: {
            type: String,
            primary: true,
            name: 'usr_id',
            transformer: ValueObjectTransformer(UserId)
        },
        name: {
            type: String,
            name: 'usr_name',
            transformer: ValueObjectTransformer(UserName)
        },
        nickName: {
            type: String,
            name: 'usr_nick_name',
            transformer: ValueObjectTransformer(UserNickName)
        },
        email: {
            type: String,
            name: 'usr_email',
            transformer: ValueObjectTransformer(UserEmail)
        },
        hashedPassword: {
            type: String,
            name: 'user_hashed_password',
            transformer: ValueObjectTransformer(UserHashedPassword)
        }
    },
    relations: {
        roleList: {
            type: 'many-to-many',
            target: 'Role',
            joinTable: {
                name: 'tbl_user_x_role',
                joinColumn: {
                    name: 'usr_id',
                    referencedColumnName: 'id',
                },
                inverseJoinColumn: {
                    name: 'rol_id',
                    referencedColumnName: 'id'
                }
            },
            cascade: ['insert']
        }
    }
})