import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || 'your-fallback-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES || '7d';

export const generateToken = (userId: string): string => {
  return jwt.sign(
    {
      userId,
      iat: Math.floor(Date.now() / 1000)
    },
    JWT_SECRET as jwt.Secret,
    { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] }
  );
};
