import statusCode from 'http-status-codes';
export function checkRole(requiredRole) {
    return function (req, res, next) {
        const isAdmin = req.user && req.user.isAdmin;

        if ((requiredRole === "admin" && isAdmin) || (requiredRole === "user" && !isAdmin)) {
            return next();
        } else {
            const error = new Error(`Access denied: ${requiredRole === "admin" ? "Admin Only!" : "Bidders Only!"}`);
            error.status = statusCode.UNAUTHORIZED;
            return next(error);
        }
    };
}
