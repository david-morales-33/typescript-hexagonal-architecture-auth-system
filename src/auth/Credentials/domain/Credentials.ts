import { CredentialsDTO } from "./CredentialsDTO";
import { CredentialsEmail } from "./CredentialsEmail";
import { CredentialsId } from "./CredentialsId";
import { CredentialsPassword } from "./CredentialsPassword";

export class Credentials {
    constructor(
        public readonly id: CredentialsId,
        public readonly email: CredentialsEmail,
        public readonly password: CredentialsPassword
    ) { }

    public static fromPrimitives(data: CredentialsDTO): Credentials {
        return new Credentials(
            new CredentialsId(data.id),
            new CredentialsEmail(data.email),
            new CredentialsPassword(data.password)
        )
    }

    toPrimitives(): CredentialsDTO {
        return new CredentialsDTO(
            this.id.value,
            this.email.value,
            this.password.value
        )
    }
}