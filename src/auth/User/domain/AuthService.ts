import { Token } from "../../Token/domain/Token";
import { User } from "./User";
import { UserId } from "./UserId";

export interface AuthService{
    generateToken(userId: UserId): Promise<Token>;
    decodedToken(token: Token): Promise<User>;
    validateToken(token: Token): Promise<boolean>;
}