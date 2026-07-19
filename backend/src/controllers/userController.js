import User from '../models/userModel.js';
import logger from '../config/logger.js';

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
