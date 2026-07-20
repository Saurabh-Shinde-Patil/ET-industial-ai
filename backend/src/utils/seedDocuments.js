import Document from '../models/documentModel.js';
import Chunk from '../models/chunkModel.js';
import Asset from '../models/assetModel.js';
import User from '../models/userModel.js';
import logger from '../config/logger.js';
import { chunkAndEmbedDocumentFromAI, indexChunksInFAISS } from '../services/aiServiceProxy.js';

export const seedInitialDocuments = async () => {
  const adminUser = await User.findOne({ role: 'Admin' });
  const docAdminUser = await User.findOne({ role: 'Knowledge Admin' });
  const userId = docAdminUser?._id || adminUser?._id;

  if (!userId) {
    logger.warn('Cannot seed documents: No Admin or Knowledge Admin user found');
    return [];
  }

  // Fetch assets to map documents
  const pump101 = await Asset.findOne({ assetCode: 'PUMP-101' });
  const boiler02 = await Asset.findOne({ assetCode: 'BOILER-02' });
  const comp07 = await Asset.findOne({ assetCode: 'COMP-07' });
  const turbine04 = await Asset.findOne({ assetCode: 'TURBINE-04' });
  const reactor05 = await Asset.findOne({ assetCode: 'REACTOR-05' });

  const sampleDocs = [
    {
      title: 'SOP-PUMP-101: Main Feedwater Pump Cold Startup & Prime Sequence',
      documentType: 'SOP',
      fileName: 'SOP_PUMP_101_Startup_v2.pdf',
      filePath: 'uploads/SOP_PUMP_101_Startup_v2.pdf',
      fileType: 'PDF',
      fileSize: 2450000,
      uploadedBy: userId,
      linkedAssetIds: pump101 ? [pump101._id] : [],
      version: 'v2.1',
      extractionStatus: 'Extracted',
      chunkCount: 1,
      isOCR: false,
      rawContent: `STANDARD OPERATING PROCEDURE: MAIN FEEDWATER PUMP (PUMP-101) COLD STARTUP
1. Purpose & Scope: Establish operational readiness for high-pressure feedwater supply.
2. Pre-Check Protocol: Verify lube oil reservoir level (>75%), mechanical seal flush flow (Plan 53A accumulator pressure at 4.2 bar), suction valve MOV-101 fully open.
3. Startup Steps: Engage auxiliary lube oil pump. Start main drive motor (350 kW) at minimum speed setting. Gradually open discharge valve MOV-102 over 90 seconds while monitoring vibration FFT spectra (<2.8 mm/s RMS).
4. Trip Limits: Immediately shutdown if bearing drive end temp exceeds 85°C or seal flush delta pressure drops below 1.5 bar.`,
    },
    {
      title: 'MAINT-BOILER-02: Annual Tube Inspection & Pressure Overhaul Report',
      documentType: 'Maintenance Log',
      fileName: 'MAINT_BOILER_02_Annual_Overhaul_2025.pdf',
      filePath: 'uploads/MAINT_BOILER_02_Annual_Overhaul_2025.pdf',
      fileType: 'PDF',
      fileSize: 4800000,
      uploadedBy: userId,
      linkedAssetIds: boiler02 ? [boiler02._id] : [],
      version: 'v1.0',
      extractionStatus: 'Extracted',
      chunkCount: 1,
      isOCR: false,
      rawContent: `ANNUAL MAINTENANCE OVERHAUL REPORT: BOILER-02 (50 T/h Water-Tube Steam Boiler)
Summary: Hydrostatic test conducted at 63 bar (1.5x design rating). NDT ultrasonic thickness gauge identified minor wall thinning on superheater bank row 3 (minimum thickness 4.2 mm vs nominal 5.0 mm). Replaced safety relief valve SRV-201 gasket. Burner nozzle tips cleaned and recalibrated for 88.5% efficiency.`,
    },
    {
      title: 'RCA-COMP-07: Root Cause Failure Analysis of Air Compressor Lube Oil Starvation',
      documentType: 'Root Cause Analysis',
      fileName: 'RCA_COMP_07_Oil_Starvation.pdf',
      filePath: 'uploads/RCA_COMP_07_Oil_Starvation.pdf',
      fileType: 'PDF',
      fileSize: 3100000,
      uploadedBy: userId,
      linkedAssetIds: comp07 ? [comp07._id] : [],
      version: 'v1.2',
      extractionStatus: 'Extracted',
      chunkCount: 1,
      isOCR: true,
      rawContent: `INCIDENT ROOT CAUSE ANALYSIS REPORT (RCA-COMP-07-2026)
Event Date: June 14, 2026. Equipment: Multi-Stage Screw Air Compressor (COMP-07).
Failure Description: High male screw bearing temperature trip (104°C).
Root Cause: Debris blockage in oil filter bypass valve resulting in starvation to drive bearings.
Corrective Actions: Implemented 500-hour differential pressure transmitter inspections and upgraded lube filter mesh from 25 micron to 10 micron synthetic glass fibre.`,
    },
    {
      title: 'PM-TURBINE-04: 8000-Hour Steam Turbine Preventive Maintenance Schedule',
      documentType: 'Preventive Maintenance',
      fileName: 'PM_TURBINE_04_8000hr_Schedule.docx',
      filePath: 'uploads/PM_TURBINE_04_8000hr_Schedule.docx',
      fileType: 'DOCX',
      fileSize: 1850000,
      uploadedBy: userId,
      linkedAssetIds: turbine04 ? [turbine04._id] : [],
      version: 'v3.0',
      extractionStatus: 'Extracted',
      chunkCount: 1,
      isOCR: false,
      rawContent: `PREVENTIVE MAINTENANCE SPECIFICATION: TURBINE-04 (12.5 MW Steam Turbine Generator)
Interval: Every 8,000 Operating Hours.
Checklist Items:
1. Inspect governor control valve linear transducer calibration.
2. Calibrate overspeed mechanical trip bolt test rig (Trip speed setting: 6600 RPM).
3. Sample turbine oil for particle count (ISO 4406 Target: 15/13/10) and varnish potential index (VPI).`,
    },
    {
      title: 'MANUAL-REACTOR-05: Hastelloy Chemical Reactor Operating Specifications',
      documentType: 'Engineering Manual',
      fileName: 'MANUAL_REACTOR_05_Specs.pdf',
      filePath: 'uploads/MANUAL_REACTOR_05_Specs.pdf',
      fileType: 'PDF',
      fileSize: 8200000,
      uploadedBy: userId,
      linkedAssetIds: reactor05 ? [reactor05._id] : [],
      version: 'v1.0',
      extractionStatus: 'Extracted',
      chunkCount: 1,
      isOCR: false,
      rawContent: `VENDOR ENGINEERING MANUAL: REACTOR-05 (15,000L Jacketed CSTR)
Design Code: ASME Section VIII Div 1. Material: Hastelloy C-276 Clad Steel.
Operating Limits: Max allowable working pressure (MAWP) 10 bar at 200°C. Jacket rating 6 bar steam. Agitator dual mechanical seal requires Plan 54 pressurized liquid barrier fluid maintained 2 bar above vessel internal pressure.`,
    },
  ];

  const createdDocs = [];

  for (const docData of sampleDocs) {
    let doc = await Document.findOne({ title: docData.title });
    if (!doc) {
      doc = await Document.create(docData);
    }
    createdDocs.push(doc);

    // Retrieve or generate chunks for this document
    let chunkDocs = await Chunk.find({ documentId: doc._id });
    if (chunkDocs.length === 0) {
      try {
        // Call Python AI Service for real SentenceTransformers 384-dim vector embeddings
        const aiRes = await chunkAndEmbedDocumentFromAI(doc._id.toString(), doc.rawContent);
        const newChunks = aiRes.chunks.map((c) => ({
          documentId: doc._id,
          chunkIndex: c.chunkIndex,
          text: c.text,
          embedding: c.embedding,
          tokenCount: c.tokenCount,
          linkedAssetIds: doc.linkedAssetIds,
          metadata: {
            title: doc.title,
            documentType: doc.documentType,
            version: doc.version,
            isOCR: doc.isOCR,
          },
        }));
        chunkDocs = await Chunk.insertMany(newChunks);
      } catch (err) {
        logger.warn(`AI vector embedding generation warning for '${doc.title}': ${err.message}`);
      }
    }

    if (chunkDocs && chunkDocs.length > 0) {
      try {
        await indexChunksInFAISS(chunkDocs);
      } catch (err) {
        logger.warn(`FAISS vector indexing warning for '${doc.title}': ${err.message}`);
      }
    }
  }

  logger.info(`Industrial Documents and Vector Chunks ready in database (${createdDocs.length} Ground-Truth Documents Vectorized)`);
  return createdDocs;
};
