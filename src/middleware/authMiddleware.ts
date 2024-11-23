import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            id: string;
            role: string;
        };
    }
}

const authMiddleware = (requiredRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Token is required', success: false });
    }
    const token = authHeader.split(' ')[1];
   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string };
        req.user = decoded;

        const hasRequiredRole = requiredRoles.some(role => decoded.role.includes(role)) 

        if (!hasRequiredRole) {
            return res.status(403).json({ message: 'Unauthorized', success: false });
        }

        next();

    } catch {
        return res.status(401).json({ message: 'Invalid token', success:false });
    }
    } 
};

export default authMiddleware;
