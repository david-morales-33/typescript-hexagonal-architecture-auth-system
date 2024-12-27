import { User } from "./User";
import { UserEmail } from "./UserEmail";

export interface UserRepository {
    find(userId: UserEmail): Promise<User>;
    create(user: User): Promise<void>;
}