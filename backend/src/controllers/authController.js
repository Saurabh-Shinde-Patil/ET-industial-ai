import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import logger from '../config/logger.js';
import { seedInitialUsers } from '../utils/seedUsers.js';

/**
 * Generate signed JWT Token
 */
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'industrial_ai_super_secret_jwt_key_2026',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    }
  );
};

/**
 * @desc    Authenticate User & get JWT token
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email/username and password',
        error: 'ValidationError',
      });
    }

    // Support login via either email or username
    const user = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: email.toLowerCase() },
      ],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. User not found.',
        error: 'InvalidCredentialsError',
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Contact Plant Admin.',
        error: 'AccountDeactivatedError',
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Password incorrect.',
        error: 'InvalidCredentialsError',
      });
    }

    const token = generateToken(user._id, user.role);

    logger.info(`Successful login: User ${user.username} (${user.role})`);

    res.status(200).json({
      success: true,
      message: 'Authentication successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        department: user.department,
        preferences: user.preferences,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Register a new user (Admin / Self-registration)
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, role, department } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required',
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
      role: role || 'Plant Operator',
      department: department || 'Plant Operations',
    });

    const token = generateToken(user._id, user.role);

    logger.info(`New user registered: ${user.username} (${user.role})`);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        department: user.department,
        preferences: user.preferences,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current authenticated user profile
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

/**
 * @desc    Seed initial plant personnel demo accounts
 * @route   POST /api/v1/auth/seed
 * @access  Public / Admin
 */
export const seedUsers = async (req, res, next) => {
  try {
    const seeded = await seedInitialUsers();
    res.status(200).json({
      success: true,
      message: `Seeded ${seeded.length} industrial demo accounts`,
      accounts: seeded,
    });
  } catch (error) {
    next(error);
  }
};
