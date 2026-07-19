import logger from '../config/logger.js';

/**
 * Enforce Role-Based Access Control (RBAC) middleware
 * @param  {...string} allowedRoles - List of authorized role strings
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required prior to authorization check',
        error: 'UnauthenticatedError',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      logger.warn(
        `RBAC Violation: User ${req.user.username} (${req.user.role}) attempted to access restricted endpoint requiring [${allowedRoles.join(', ')}]`
      );
      return res.status(403).json({
        success: false,
        message: `Forbidden: Role '${req.user.role}' lacks permission to execute this operation. Required role(s): [${allowedRoles.join(', ')}]`,
        error: 'ForbiddenRoleError',
      });
    }

    next();
  };
};
