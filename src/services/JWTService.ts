import jwt from "jsonwebtoken"

export default class JWTService {
    async sign(payload: any, secret: string, options: any): Promise<string> {
        const token = jwt.sign(payload, secret || 'nelsonsegredo', { expiresIn: '1h' });
        return token;
    }
}