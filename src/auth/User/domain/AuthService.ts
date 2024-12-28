import { Token } from "../../Token/domain/Token";
import { User } from "./User";

export interface AuthService{
    generateToken(user: User): Promise<Token>;
    decodedToken(token: Token): Promise<User>;
    validateToken(token: Token): Promise<boolean>;
}