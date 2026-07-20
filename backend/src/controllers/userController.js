import User from '../models/userModel.js';
import logger from '../config/logger.js';
import { logAuditEvent } from '../middleware/auditLogger.js';

/**
 * @desc    Get all users (Admin only) with search & role filters
 * @route   GET /api/v1/users
 * @access  Private (Admin, Knowledge Admin)
 */
export const getUsers = async (req, res, next) => {
  try {
    const { search, role, page = 1, limit = 20 } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
      ];
    }

    if (role) {
      query.role = role;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const users = await User.find(query)
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      users,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new user (Admin only)
 * @route   POST /api/v1/users
 * @access  Private (Admin)
 */
export const createUser = async (req, res, next) => {
  try {
    const { username, email, password, role, department } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, password, and role are required',
        error: 'ValidationError',
      });
    }

    const userExists = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with that email or username already exists',
        error: 'UserExistsError',
      });
    }

    const user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      passwordHash: password,
      role,
      department: department || 'Plant Operations',
    });

    logAuditEvent(
      req.user._id,
      'USER_CREATE',
      `Admin '${req.user.username}' created new user '${user.username}' with role '${role}'`,
      req.ip
    );

    res.status(201).json({
      success: true,
      message: 'Plant personnel created successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        department: user.department,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user role assignment (Admin only)
 * @route   PUT /api/v1/users/:id/role
 * @access  Private (Admin)
 */
export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    const validRoles = [
      'Plant Operator',
      'Maintenance Engineer',
      'Reliability Engineer',
      'Safety Officer',
      'Production Engineer',
      'Plant Manager',
      'Knowledge Admin',
      'Admin',
    ];

    if (!role || !validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. Must be one of: [${validRoles.join(', ')}]`,
        error: 'ValidationError',
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found',
        error: 'NotFoundError',
      });
    }

    const oldRole = user.role;
    user.role = role;
    await user.save();

    logAuditEvent(
      req.user._id,
      'ROLE_CHANGE',
      `Admin '${req.user.username}' updated role of '${user.username}' from '${oldRole}' to '${role}'`,
      req.ip
    );

    res.status(200).json({
      success: true,
      message: `User role updated to '${role}'`,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle user active/deactive status (Admin only)
 * @route   PUT /api/v1/users/:id/status
 * @access  Private (Admin)
 */
export const toggleUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found',
        error: 'NotFoundError',
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    const action = user.isActive ? 'USER_ACTIVATE' : 'USER_DEACTIVATE';
    logAuditEvent(
      req.user._id,
      action,
      `Admin '${req.user.username}' ${user.isActive ? 'activated' : 'deactivated'} user '${user.username}'`,
      req.ip
    );

    res.status(200).json({
      success: true,
      message: `User '${user.username}' ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      isActive: user.isActive,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user UI theme/preferences
 * @route   PUT /api/v1/users/preferences
 * @access  Private
 */
export const updatePreferences = async (req, res, next) => {
  try {
    const { theme } = req.body;

    if (!theme || !['dark', 'light'].includes(theme)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid theme preference. Must be "dark" or "light".',
        error: 'ValidationError',
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found',
        error: 'NotFoundError',
      });
    }

    user.preferences.theme = theme;
    await user.save();

    logger.info(`User ${user.username} updated theme preference to: ${theme}`);

    res.status(200).json({
      success: true,
      message: 'User preferences updated successfully',
      preferences: user.preferences,
    });
  } catch (error) {
    next(error);
  }
};
