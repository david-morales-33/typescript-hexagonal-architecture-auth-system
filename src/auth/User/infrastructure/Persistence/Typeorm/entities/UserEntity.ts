import { EntitySchema } from 'typeorm'
import { User } from '../../../../domain/User'
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/Persistence/TypeORM/ValueObjectTransformer'
import { UserId } from '../../../../domain/UserId'
import { UserEmail } from '../../../../domain/UserEmail'
import { UserHashedPassword } from '../../../../domain/UserHashedPassword'
import { RoleEntity } from './RoleEntity'

export const UserEntity = new EntitySchema<User>({
    name: 'User',
    tableName: 'user',
    target: User,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: ValueObjectTransformer(UserId)
        },
        email: {
            type: String,
            transformer: ValueObjectTransformer(UserEmail)
        },
        hashedPassword: {
            type: String,
            transformer: ValueObjectTransformer(UserHashedPassword)
        }
    },
    relations: {
        roleList: {
            type: 'one-to-many',
            target: RoleEntity
        }
    }
})