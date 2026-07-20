import IncidentRCA from '../models/incidentRCAModel.js';
import Asset from '../models/assetModel.js';
import logger from '../config/logger.js';

export const seedInitialIncidentRCAs = async () => {
  const comp07 = await Asset.findOne({ assetCode: 'COMP-07' });
  const pump101 = await Asset.findOne({ assetCode: 'PUMP-101' });
  const boiler02 = await Asset.findOne({ assetCode: 'BOILER-02' });

  const incidents = [
    {
      incidentNumber: 'INC-2026-COMP07',
      assetId: comp07 ? comp07._id : null,
      assetCode: 'COMP-07',
      title: 'Screw Air Compressor High Thermal Trip Due to Lube Oil Starvation',
      incidentDate: new Date('2026-03-14'),
      severity: 'CRITICAL',
      rootCauseCategory: 'Lubrication Failure',
      summary: 'COMP-07 experienced an automatic thermal trip at 104°C during peak load due to oil filter bypass clogging and particulate varnish buildup.',
      fiveWhys: [
        { whyNumber: 1, question: 'Why did COMP-07 trip?', answer: 'Operating discharge temperature exceeded thermal safety limit of 104°C.' },
        { whyNumber: 2, question: 'Why did the discharge temperature spike?', answer: 'Lube oil flow rate to male screw bearings dropped by 65% below minimum spec.' },
        { whyNumber: 3, question: 'Why did lube oil flow drop?', answer: 'The primary 25-micron oil filter element became completely clogged with particulate debris.' },
        { whyNumber: 4, question: 'Why did the filter clog prematurely?', answer: 'Varnish formation in synthetic oil reservoir due to high ambient operating temperatures (>45°C).' },
        { whyNumber: 5, question: 'Why was varnish allowed to build up?', answer: 'Oil filter replacement interval was based on operating hours rather than real-time differential pressure monitoring.' },
      ],
      correctiveActions: [
        { action: 'Upgrade lube oil filter element to 10-micron synthetic glass fibre mesh', owner: 'Senior Reliability Lead', status: 'Completed' },
        { action: 'Install differential pressure transmitter across oil filter manifold', owner: 'Instrumentation Eng', status: 'In Progress' },
        { action: 'Update preventive maintenance SOP to include monthly varnish MPC testing', owner: 'Knowledge Admin', status: 'Completed' },
      ],
      status: 'RCA Completed',
    },
    {
      incidentNumber: 'INC-2026-PUMP101',
      assetId: pump101 ? pump101._id : null,
      assetCode: 'PUMP-101',
      title: 'Feedwater Pump Dual Mechanical Seal Barrier Fluid Pressure Loss',
      incidentDate: new Date('2026-04-02'),
      severity: 'HIGH',
      rootCauseCategory: 'Pressure Drop',
      summary: 'PUMP-101 Plan 53A barrier fluid reservoir pressure dropped to 1.8 bar, triggering low barrier pressure alarm.',
      fiveWhys: [
        { whyNumber: 1, question: 'Why did the Plan 53A alarm trigger?', answer: 'Barrier fluid accumulator pressure dropped below 2.0 bar threshold.' },
        { whyNumber: 2, question: 'Why did barrier pressure drop?', answer: 'Nitrogen gas pre-charge in the accumulator bladders leaked through a micro-crack.' },
        { whyNumber: 3, question: 'Why did the bladder crack?', answer: 'NBR rubber bladder degraded due to temperature spikes above 85°C.' },
        { whyNumber: 4, question: 'Why did fluid temperature spike?', answer: 'Cooling water flow to Plan 53A heat exchanger was restricted by scaling.' },
        { whyNumber: 5, question: 'Why was scaling present?', answer: 'Cooling water line flushing schedule was missed during previous shutdown.' },
      ],
      correctiveActions: [
        { action: 'Replace Plan 53A accumulator bladder with Viton high-temp elastomer', owner: 'Mechanical Specialist', status: 'Completed' },
        { action: 'Descale and flush Plan 53A heat exchanger cooling tubes', owner: 'Maintenance Team', status: 'Completed' },
      ],
      status: 'Actions Implemented',
    },
    {
      incidentNumber: 'INC-2026-BOILER02',
      assetId: boiler02 ? boiler02._id : null,
      assetCode: 'BOILER-02',
      title: 'Water-Tube Boiler Row 3 Superheater Wall Thinning & Hydrostatic Leak',
      incidentDate: new Date('2026-05-10'),
      severity: 'CRITICAL',
      rootCauseCategory: 'Corrosion Thinning',
      summary: 'Pin-hole steam leak detected on superheater tube row 3 during routine ultrasonic thickness gauge audit.',
      fiveWhys: [
        { whyNumber: 1, question: 'Why did the superheater leak steam?', answer: 'Tube wall thickness degraded down to 1.2 mm against 4.5 mm design minimum.' },
        { whyNumber: 2, question: 'Why did tube wall thin excessively?', answer: 'High-temperature fireside coal ash corrosion and localized erosion.' },
        { whyNumber: 3, question: 'Why was erosion localized?', answer: 'Sootblower nozzle misalignment caused direct steam jet impingement on row 3.' },
        { whyNumber: 4, question: 'Why was sootblower misaligned?', answer: 'Thermal expansion of boiler wall box shifted sootblower lance alignment angle.' },
        { whyNumber: 5, question: 'Why was thermal shift unnoticed?', answer: 'Sootblower mechanical alignment was not checked post-boiler cold restart.' },
      ],
      correctiveActions: [
        { action: 'Replace damaged 12-meter superheater tube section with SA-213 T91 alloy steel', owner: 'Boiler Repair Contractor', status: 'Completed' },
        { action: 'Re-align sootblower lances and install stainless steel wear shields on row 3', owner: 'Maintenance Engineer', status: 'Completed' },
      ],
      status: 'Closed',
    },
  ];

  const created = [];
  for (const incData of incidents) {
    let inc = await IncidentRCA.findOne({ incidentNumber: incData.incidentNumber });
    if (!inc && incData.assetId) {
      inc = await IncidentRCA.create(incData);
      created.push(inc);
    } else if (inc) {
      created.push(inc);
    }
  }

  logger.info(`Seeded ${created.length} Ground-Truth Incident RCA Reports`);
  return created;
};
