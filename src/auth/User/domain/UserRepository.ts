import { User } from "./User";
import { UserEmail } from "./UserEmail";

export interface UserRepository {
    find(userId: UserEmail): Promise<User | null>;
    save(user: User): Promise<void>;
}