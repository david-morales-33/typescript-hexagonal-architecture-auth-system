import { CredentialsPassword } from "../../Credentials/domain/CredentialsPassword";
import { UserHashedPassword } from "./UserHashedPassword";

export interface PasswordService {
    encrypt(password: CredentialsPassword): Promise<UserHashedPassword>;
    validate(passwordHashed: UserHashedPassword, password: CredentialsPassword): Promise<boolean>;
}