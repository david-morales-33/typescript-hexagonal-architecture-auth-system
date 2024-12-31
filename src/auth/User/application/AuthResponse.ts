import { Token } from "../../Token/domain/Token";
import { User } from "../domain/User";

interface Reponse {
    id: string;
    name: string;
    nickName: string;
    email: string;
    roles: string[];
    token: {
        token: string;
        creationDate: Date;
        expirationDate: Date;
    }
}

export class AuthResponse {
    public readonly response: Reponse
    constructor(user: User, token: Token) {
        this.response = {
            id: user.id.value,
            name: user.name.value,
            nickName: user.nickName.value,
            email: user.email.value,
            roles: [],
            token: {
                token: token.id.value,
                creationDate: token.creationDate.value,
                expirationDate: token.expirationDate.value
            }
        }
    }
}