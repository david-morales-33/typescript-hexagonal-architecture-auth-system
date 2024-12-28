import { CredentialsPassword } from "../../Credentials/domain/CredentialsPassword";
import { Role } from "../../Role/domain/Role";
import { PasswordService } from "./PasswordService";
import { UserDTO } from "./UserDTO";
import { UserEmail } from "./UserEmail";
import { UserHashedPassword } from "./UserHashedPassword";
import { UserId } from "./UserId";

export class User {
    private _hashedPassword?: UserHashedPassword

    constructor(
        public readonly id: UserId,
        public readonly email: UserEmail,
        public readonly roleList: Role[],
        hashedPassword?: UserHashedPassword
    ) { this._hashedPassword = hashedPassword }

    public static create(id: UserId, email: UserEmail, roleList: Role[]): User {
        return new User(id, email, roleList);
    }

    public static fromPrimitives(data: UserDTO): User {
        return new User(
            new UserId(data.id),
            new UserEmail(data.email),
            data.roleList.map(entry => Role.fromPrimitives(entry))
        )
    }

    public async validatePassword(service: PasswordService, password: CredentialsPassword): Promise<boolean> {
        if (this._hashedPassword === null || this._hashedPassword === undefined) throw new Error('Password does not exists');
        return await service.validate(this._hashedPassword, password);
    }

    public async encryptPassword(service: PasswordService, password: CredentialsPassword): Promise<void> {
        this._hashedPassword = await service.encrypt(password);
    }

    toPrimitives(): UserDTO {
        return new UserDTO(this.id.value, this.email.value, this.roleList.map(entry => entry.toPrimitives()))
    }
}