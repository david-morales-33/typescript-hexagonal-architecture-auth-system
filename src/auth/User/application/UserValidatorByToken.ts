import { Token } from "../../Token/domain/Token";
import { AuthService } from "../domain/AuthService";
import { AuthResponse } from "./AuthResponse";

export class UserValidatorByToken {
    constructor(private service: AuthService) { }
    async execute(token: Token) {
        const response = await this.service.validateToken(token);
        if (!response) throw new Error('Token not valid');

        const user = await this.service.decodedToken(token);
        return new AuthResponse(user, token);
    }
}