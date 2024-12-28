import { Credentials } from "../../Credentials/domain/Credentials";
import { AuthService } from "../domain/AuthService";
import { PasswordService } from "../domain/PasswordService";
import { UserRepository } from "../domain/UserRepository";
import { AuthResponse } from "./AuthResponse";

export class UserValidatorByCredentials {
    constructor(
        private repository: UserRepository,
        private authService: AuthService,
        private passwordService: PasswordService
    ) { }
    async execute(credentials: Credentials) {

        const user = await this.repository.find(credentials.email);
        if (user === null) return new Error('Wrong email');

        const response = await user.validatePassword(this.passwordService, credentials.password);
        if (!response) throw new Error("Wrong password");

        const token = await this.authService.generateToken(user);
        return new AuthResponse(user, token);
    }
}