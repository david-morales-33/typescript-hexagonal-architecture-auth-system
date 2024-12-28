import { Token } from "../../Token/domain/Token";
import { AuthService } from "../domain/AuthService";

export class UserValidatorByToken {
    constructor() { }
    async execute(token: Token, service: AuthService) {
        const response = await service.validateToken(token);
        if (!response) throw new Error('Token not valid');

        return await service.decodedToken(token);
    }
}