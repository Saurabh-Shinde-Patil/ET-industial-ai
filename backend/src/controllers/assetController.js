import Asset from '../models/assetModel.js';
import logger from '../config/logger.js';
import { seedInitialAssets } from '../utils/seedAssets.js';
import { logAuditEvent } from '../middleware/auditLogger.js';

/**
 * @desc    Get complete hierarchical plant asset tree
 * @route   GET /api/v1/assets/tree
 * @access  Private
 */
export const getAssetTree = async (req, res, next) => {
  try {
    // Fetch top-level assets (parentAssetId is null)
    const rootAssets = await Asset.find({ parentAssetId: null })
      .lean();

    // Populate children for each root asset recursively
    const tree = await Promise.all(
      rootAssets.map(async (root) => {
        const children = await Asset.find({ parentAssetId: root._id }).lean();
        return {
          ...root,
          children,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: tree.length,
      tree,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get assets with category, status, and search filters
 * @route   GET /api/v1/assets
 * @access  Private
 */
export const getAssets = async (req, res, next) => {
  try {
    const { category, status, search, page = 1, limit = 50 } = req.query;

    const query = {};

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { assetCode: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const assets = await Asset.find(query)
      .populate('parentAssetId', 'assetCode name')
      .sort({ assetCode: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Asset.countDocuments(query);

    res.status(200).json({
      success: true,
      count: assets.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      assets,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single asset profile details
 * @route   GET /api/v1/assets/:id
 * @access  Private
 */
export const getAssetById = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.params.id)
      .populate('parentAssetId', 'assetCode name location');

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset node not found',
        error: 'NotFoundError',
      });
    }

    const children = await Asset.find({ parentAssetId: asset._id }).select('assetCode name category status');

    res.status(200).json({
      success: true,
      asset: {
        ...asset.toObject(),
        children,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new physical asset node
 * @route   POST /api/v1/assets
 * @access  Private (Admin, Knowledge Admin, Maintenance Engineer)
 */
export const createAsset = async (req, res, next) => {
  try {
    const { assetCode, name, category, parentAssetId, location, status, specifications, installedDate } = req.body;

    if (!assetCode || !name || !category || !location) {
      return res.status(400).json({
        success: false,
        message: 'Asset code, name, category, and location are required',
        error: 'ValidationError',
      });
    }

    const exists = await Asset.findOne({ assetCode: assetCode.toUpperCase() });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: `Asset code '${assetCode}' already exists in plant graph`,
        error: 'DuplicateAssetCodeError',
      });
    }

    const asset = await Asset.create({
      assetCode: assetCode.toUpperCase(),
      name,
      category,
      parentAssetId: parentAssetId || null,
      location,
      status: status || 'Operational',
      specifications: specifications || {},
      installedDate: installedDate || Date.now(),
    });

    logAuditEvent(
      req.user._id,
      'USER_CREATE',
      `User '${req.user.username}' created new asset node '${asset.assetCode} - ${asset.name}'`,
      req.ip
    );

    res.status(201).json({
      success: true,
      message: 'Asset node created successfully',
      asset,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update asset details and specs
 * @route   PUT /api/v1/assets/:id
 * @access  Private (Admin, Knowledge Admin, Maintenance Engineer)
 */
export const updateAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset node not found',
        error: 'NotFoundError',
      });
    }

    const { name, category, location, status, specifications } = req.body;

    if (name) asset.name = name;
    if (category) asset.category = category;
    if (location) asset.location = location;
    if (status) asset.status = status;
    if (specifications) asset.specifications = specifications;

    await asset.save();

    res.status(200).json({
      success: true,
      message: `Asset '${asset.assetCode}' updated successfully`,
      asset,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete asset node
 * @route   DELETE /api/v1/assets/:id
 * @access  Private (Admin)
 */
export const deleteAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset node not found',
        error: 'NotFoundError',
      });
    }

    await Asset.findByIdAndDelete(req.params.id);

    logAuditEvent(
      req.user._id,
      'DOC_DELETE',
      `Admin '${req.user.username}' deleted asset node '${asset.assetCode}'`,
      req.ip
    );

    res.status(200).json({
      success: true,
      message: `Asset '${asset.assetCode}' removed from hierarchy`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Seed initial 10 plant assets
 * @route   POST /api/v1/assets/seed
 * @access  Private (Admin)
 */
export const seedAssets = async (req, res, next) => {
  try {
    const seeded = await seedInitialAssets();
    res.status(200).json({
      success: true,
      message: `Seeded ${seeded.length} industrial plant assets into database`,
      assets: seeded,
    });
  } catch (error) {
    next(error);
  }
};
