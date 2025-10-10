// middleware/auth.middleware.ts
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/verifyToken';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Access denied. No token provided."
      });
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Invalid or expired token"
    });
  }
};

// Optional: Admin middleware for role-based access
export const adminMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: "Access denied. Not authenticated."
      });
    }

    // You can add role checking here if you have multiple roles
    // const user = await AuthService.getCurrentUser(req.user.userId);
    // if (user.role !== 'OWNER' && user.role !== 'ADMIN') {
    //   return res.status(403).json({
    //     success: false,
    //     error: "Access denied. Insufficient permissions."
    //   });
    // }

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Authentication failed"
    });
  }
};