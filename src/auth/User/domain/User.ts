import { CredentialsPassword } from "../../Credentials/domain/CredentialsPassword";
import { Role } from "../../Role/domain/Role";
import { PasswordService } from "./PasswordService";
import { UserDTO } from "./UserDTO";
import { UserEmail } from "./UserEmail";
import { UserHashedPassword } from "./UserHashedPassword";
import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserNickName } from "./UserNickName";

export class User {
    private _hashedPassword: UserHashedPassword | null;
    private _nickName: UserNickName;

    constructor(
        public readonly id: UserId,
        public readonly name: UserName,
        public readonly email: UserEmail,
        public readonly roleList: Role[],
        hashedPassword: UserHashedPassword | null
    ) {
        this._hashedPassword = hashedPassword;
        const index = email.value.indexOf('@');
        this._nickName = new UserNickName(email.value.slice(0, index));
    }

    public get hashedPassword(): UserHashedPassword | null {
        return this._hashedPassword;
    }

    public get nickName(): UserNickName {
        return this._nickName;
    }

    public static create(id: UserId, name: UserName, email: UserEmail, roleList: Role[]): User {
        return new User(id, name, email, roleList, null);
    }

    public static fromPrimitives(data: UserDTO): User {
        return new User(
            new UserId(data.id),
            new UserName(data.name),
            new UserEmail(data.email),
            data.roleList.map(entry => Role.fromPrimitives(entry)),
            null
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
        return new UserDTO(
            this.id.value,
            this.name.value,
            this._nickName.value,
            this.email.value,
            this.roleList.map(entry => entry.toPrimitives())
        )
    }
}