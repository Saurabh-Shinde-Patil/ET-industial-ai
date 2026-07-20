import AuditLog from '../models/auditLogModel.js';
import logger from '../config/logger.js';

/**
 * Log a security/audit event to MongoDB
 */
export const logAuditEvent = async (userId, action, details, ipAddress = '127.0.0.1') => {
  try {
    await AuditLog.create({
      userId,
      action,
      details,
      ipAddress,
    });
    logger.info(`Audit Logged [${action}]: ${details}`);
  } catch (error) {
    logger.error(`Failed to create Audit Log entry: ${error.message}`);
  }
};
