import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

const SALT_ROUNDS = 10;
const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const hashPassword = async (password: string) => {
    return await hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (password: string, hash: string) => {
    return await compare(password, hash);
};

export const generateToken = (payload: object) => {
    return sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
    try {
        return verify(token, ACCESS_TOKEN_SECRET);
    } catch (error) {
        return null;
    }
};
