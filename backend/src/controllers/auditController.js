import AuditLog from '../models/auditLogModel.js';

/**
 * @desc    Get audit logs with action & date filters (Admin only)
 * @route   GET /api/v1/audit-logs
 * @access  Private (Admin, Knowledge Admin)
 */
export const getAuditLogs = async (req, res, next) => {
  try {
    const { action, page = 1, limit = 50 } = req.query;

    const query = {};
    if (action) {
      query.action = action;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const logs = await AuditLog.find(query)
      .populate('userId', 'username role email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await AuditLog.countDocuments(query);

    res.status(200).json({
      success: true,
      count: logs.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      logs,
    });
  } catch (error) {
    next(error);
  }
};
