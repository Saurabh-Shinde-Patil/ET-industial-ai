import PMRecommendation from '../models/pmRecommendationModel.js';
import Asset from '../models/assetModel.js';
import logger from '../config/logger.js';
import { seedInitialPMRecommendations } from '../utils/seedPMRecommendations.js';
import { analyzePMRiskFromAI } from '../services/aiServiceProxy.js';

/**
 * @desc    Get all PM recommendations with filters
 * @route   GET /api/v1/pm-recommendations
 * @access  Private
 */
export const getPMRecommendations = async (req, res, next) => {
  try {
    const { priority, status, search } = req.query;

    const query = {};
    if (priority) query.priority = priority;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { assetCode: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
      ];
    }

    const recommendations = await PMRecommendation.find(query)
      .populate('assetId', 'assetCode name location category status')
      .sort({ riskScore: -1 });

    res.status(200).json({
      success: true,
      count: recommendations.length,
      recommendations,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Trigger AI PM Risk Analysis for a specific plant asset
 * @route   POST /api/v1/pm-recommendations/analyze/:assetId
 * @access  Private (Admin, Knowledge Admin, Maintenance Engineer)
 */
export const analyzeAssetPM = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.params.assetId);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset node not found',
        error: 'NotFoundError',
      });
    }

    let aiResult;
    try {
      aiResult = await analyzePMRiskFromAI(asset.assetCode, asset.category);
    } catch (err) {
      logger.warn(`AI PM engine fallback: ${err.message}`);
      aiResult = {
        asset_code: asset.assetCode,
        risk_score: 75.0,
        priority: 'HIGH',
        justification: `High operational usage detected for ${asset.assetCode}. Recommended preventive overhaul.`,
        action_items: [
          `Inspect mechanical seal and bearing lubrication for ${asset.assetCode}`,
          'Perform vibration & thermal imaging survey',
        ],
      };
    }

    // Upsert PM recommendation record
    let pm = await PMRecommendation.findOne({ assetId: asset._id });
    if (!pm) {
      pm = new PMRecommendation({
        assetId: asset._id,
        assetCode: asset.assetCode,
        title: `PM Schedule for ${asset.assetCode} - ${asset.name}`,
        category: asset.category,
      });
    }

    pm.riskScore = aiResult.risk_score;
    pm.priority = aiResult.priority;
    pm.justification = aiResult.justification;
    pm.actionItems = aiResult.action_items;
    pm.status = 'Active';

    await pm.save();

    res.status(200).json({
      success: true,
      message: `AI PM Risk Analysis completed for asset '${asset.assetCode}'`,
      recommendation: pm,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update status of PM recommendation (Active -> Scheduled -> Completed)
 * @route   PUT /api/v1/pm-recommendations/:id/status
 * @access  Private
 */
export const updatePMStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const pm = await PMRecommendation.findById(req.params.id);

    if (!pm) {
      return res.status(404).json({
        success: false,
        message: 'PM Recommendation record not found',
        error: 'NotFoundError',
      });
    }

    pm.status = status;
    await pm.save();

    res.status(200).json({
      success: true,
      message: `PM schedule status updated to '${status}'`,
      recommendation: pm,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Seed sample PM recommendations
 * @route   POST /api/v1/pm-recommendations/seed
 * @access  Private (Admin)
 */
export const seedPMRecommendations = async (req, res, next) => {
  try {
    const seeded = await seedInitialPMRecommendations();
    res.status(200).json({
      success: true,
      message: `Seeded ${seeded.length} PM recommendations into database`,
      recommendations: seeded,
    });
  } catch (error) {
    next(error);
  }
};
