import jwt from 'jsonwebtoken';
import statusCode from 'http-status-codes';

const SECRET_KEY = 'myKey';

export function isLogin(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(statusCode.UNAUTHORIZED).json({ message: 'Access denied' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(statusCode.UNAUTHORIZED).json({ message: 'Invalid token' });
        }

        req.user = decoded;
        next();
    });
}
