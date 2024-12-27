
export interface AuthService{
    generateToken(userId: string): Promise<String>;
    validateToken(token: string): Promise<boolean>;
}