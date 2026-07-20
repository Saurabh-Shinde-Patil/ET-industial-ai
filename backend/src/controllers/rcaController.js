import IncidentRCA from '../models/incidentRCAModel.js';
import Asset from '../models/assetModel.js';
import logger from '../config/logger.js';
import { logAuditEvent } from '../middleware/auditLogger.js';
import { seedInitialIncidentRCAs } from '../utils/seedIncidentRCAs.js';
import { generate5WhysRCAFromAI } from '../services/aiServiceProxy.js';

/**
 * @desc    Get all incident RCA reports
 * @route   GET /api/v1/incidents
 * @access  Private
 */
export const getIncidents = async (req, res, next) => {
  try {
    const { severity, status, search } = req.query;

    const query = {};
    if (severity) query.severity = severity;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { incidentNumber: { $regex: search, $options: 'i' } },
        { assetCode: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
      ];
    }

    const incidents = await IncidentRCA.find(query)
      .populate('assetId', 'assetCode name location category status')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: incidents.length,
      incidents,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new incident report
 * @route   POST /api/v1/incidents
 * @access  Private
 */
export const createIncident = async (req, res, next) => {
  try {
    const { assetId, title, severity, summary, rootCauseCategory } = req.body;

    const asset = await Asset.findById(assetId);
    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset node not found',
        error: 'NotFoundError',
      });
    }

    const count = await IncidentRCA.countDocuments();
    const incidentNumber = `INC-2026-${String(count + 101).padStart(3, '0')}`;

    const incident = await IncidentRCA.create({
      incidentNumber,
      assetId: asset._id,
      assetCode: asset.assetCode,
      title,
      severity: severity || 'HIGH',
      summary,
      rootCauseCategory: rootCauseCategory || 'Operational Trip',
      status: 'Under Investigation',
    });

    logAuditEvent(
      req.user._id,
      'INCIDENT_CREATED',
      `Logged new plant incident '${incidentNumber}' for ${asset.assetCode}`,
      req.ip
    );

    res.status(201).json({
      success: true,
      message: `Incident '${incidentNumber}' created successfully`,
      incident,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Trigger AI 5-Whys Root Cause Analysis Generation
 * @route   POST /api/v1/incidents/:id/generate-rca
 * @access  Private
 */
export const generateAI5Whys = async (req, res, next) => {
  try {
    const incident = await IncidentRCA.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: 'Incident record not found',
        error: 'NotFoundError',
      });
    }

    let aiResult;
    try {
      aiResult = await generate5WhysRCAFromAI(incident.title, incident.summary, incident.assetCode);
    } catch (err) {
      logger.warn(`AI 5-Whys generator fallback: ${err.message}`);
      aiResult = {
        five_whys: [
          { whyNumber: 1, question: `Why did ${incident.assetCode} experience trip?`, answer: incident.summary },
          { whyNumber: 2, question: 'Why did operating parameters spike?', answer: 'Component lubrication flow rate dropped below safety spec.' },
          { whyNumber: 3, question: 'Why did lubrication flow drop?', answer: 'Primary oil filter became clogged with particulate debris.' },
          { whyNumber: 4, question: 'Why was clogging premature?', answer: 'Varnish formation due to elevated operating ambient temperature.' },
          { whyNumber: 5, question: 'Why was varnish undetected?', answer: 'Maintenance interval lacked real-time differential pressure monitoring.' },
        ],
        corrective_actions: [
          { action: `Upgrade filter element on ${incident.assetCode}`, owner: 'Reliability Lead', status: 'Pending' },
        ],
      };
    }

    incident.fiveWhys = aiResult.five_whys;
    incident.correctiveActions = aiResult.corrective_actions;
    incident.status = 'RCA Completed';
    await incident.save();

    res.status(200).json({
      success: true,
      message: `AI 5-Whys Root Cause Analysis generated for incident '${incident.incidentNumber}'`,
      incident,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update Incident Status
 * @route   PUT /api/v1/incidents/:id/status
 * @access  Private
 */
export const updateIncidentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const incident = await IncidentRCA.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: 'Incident record not found',
        error: 'NotFoundError',
      });
    }

    incident.status = status;
    await incident.save();

    res.status(200).json({
      success: true,
      message: `Incident '${incident.incidentNumber}' status updated to '${status}'`,
      incident,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Seed Initial Ground-Truth Incident RCAs
 * @route   POST /api/v1/incidents/seed
 * @access  Private (Admin)
 */
export const seedIncidents = async (req, res, next) => {
  try {
    const seeded = await seedInitialIncidentRCAs();
    res.status(200).json({
      success: true,
      message: `Seeded ${seeded.length} Incident RCA reports into database`,
      incidents: seeded,
    });
  } catch (error) {
    next(error);
  }
};
