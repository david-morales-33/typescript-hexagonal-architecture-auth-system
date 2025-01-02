import { CredentialsEmail } from "../../Credentials/domain/CredentialsEmail";
import { User } from "./User";

export interface UserRepository {
    find(userId: CredentialsEmail): Promise<User | null>;
    save(user: User): Promise<void>;
}