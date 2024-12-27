
export interface PasswordService {
    encrypt(password: string): Promise<string>;
    validate(passwordHashed: string, password: string): Promise<boolean>;
}