import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import logger from '../config/logger.js';

/**
 * Protect routes by verifying JWT Bearer token in Authorization header
 */
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'industrial_ai_super_secret_jwt_key_2026'
      );

      // Get user from database excluding passwordHash
      const user = await User.findById(decoded.id).select('-passwordHash');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User account no longer exists',
          error: 'UnauthorizedError',
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'User account has been deactivated',
          error: 'AccountDeactivatedError',
        });
      }

      req.user = user;
      next();
    } catch (error) {
      logger.error(`JWT Auth Verification Error: ${error.message}`);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed or expired',
        error: 'InvalidTokenError',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no Bearer token provided',
      error: 'MissingTokenError',
    });
  }
};
