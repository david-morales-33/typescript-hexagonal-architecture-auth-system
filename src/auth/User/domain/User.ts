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

    constructor(
        public readonly id: UserId,
        public readonly name: UserName,
        public readonly nickName: UserNickName,
        public readonly email: UserEmail,
        public hashedPassword: UserHashedPassword,
        public readonly roleList: Role[]
    ) { }

    public static create(id: UserId, name: UserName, email: UserEmail, hashedPassword: UserHashedPassword, roleList: Role[]): User {
        const index = email.value.indexOf('@');
        const nickName = new UserNickName(email.value.slice(0, index));

        return new User(id, name, nickName, email, hashedPassword, roleList);
    }

    public static fromPrimitives(data: UserDTO): User {
        return new User(
            new UserId(data.id),
            new UserName(data.name),
            new UserNickName(data.nickName),
            new UserEmail(data.email),
            new UserId(data.hashedPassword),
            data.roleList.map(entry => Role.fromPrimitives(entry)),
        )
    }

    public async validatePassword(service: PasswordService, password: CredentialsPassword): Promise<boolean> {
        if (this.hashedPassword === null || this.hashedPassword === undefined) throw new Error('Password does not exists');
        return await service.validate(this.hashedPassword, password);
    }

    public async encryptPassword(service: PasswordService, password: CredentialsPassword): Promise<void> {
        this.hashedPassword = await service.encrypt(password);
    }

    toPrimitives(): UserDTO {
        return new UserDTO(
            this.id.value,
            this.name.value,
            this.nickName.value,
            this.email.value,
            this.hashedPassword.value,
            this.roleList.map(entry => entry.toPrimitives())
        )
    }
}