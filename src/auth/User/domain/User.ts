import { UserDTO } from "./UserDTO";
import { UserEmail } from "./UserEmail";
import { UserHashedPassword } from "./UserHashedPassword";
import { UserId } from "./UserId";

export class User {
    constructor(
        public readonly id: UserId,
        public readonly email: UserEmail,
        public readonly hashedPassword: UserHashedPassword
    ) { }

    public static create(
        id: UserId,
        email: UserEmail,
        hashedPassword: UserHashedPassword
    ): User {
        return new User(id, email, hashedPassword);
    }

    public static fromPrimitives(data: UserDTO): User {
        return new User(
            new UserId(data.id),
            new UserEmail(data.email),
            new UserHashedPassword(data.hashedPassword)
        )
    }

    toPrimitives(): UserDTO {
        return new UserDTO(this.id.value, this.email.value, this.hashedPassword.value)
    }
}