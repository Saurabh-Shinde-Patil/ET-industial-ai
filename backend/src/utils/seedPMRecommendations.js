import PMRecommendation from '../models/pmRecommendationModel.js';
import Asset from '../models/assetModel.js';
import logger from '../config/logger.js';

export const seedInitialPMRecommendations = async () => {
  const pump101 = await Asset.findOne({ assetCode: 'PUMP-101' });
  const boiler02 = await Asset.findOne({ assetCode: 'BOILER-02' });
  const comp07 = await Asset.findOne({ assetCode: 'COMP-07' });
  const turbine04 = await Asset.findOne({ assetCode: 'TURBINE-04' });
  const reactor05 = await Asset.findOne({ assetCode: 'REACTOR-05' });

  const pmSchedules = [
    {
      assetId: pump101 ? pump101._id : null,
      assetCode: 'PUMP-101',
      title: 'Feedwater Pump Mechanical Seal Plan 53A & Bearing Lubrication Overhaul',
      category: 'Pumps',
      riskScore: 78,
      priority: 'HIGH',
      recommendedInterval: '500 Operating Hours',
      actionItems: [
        'Inspect Plan 53A barrier fluid accumulator pressure (Maintain > 4.2 bar)',
        'Sample bearing lube oil for particle count & moisture contamination',
        'Verify drive motor vibration FFT spectra (< 2.8 mm/s RMS threshold)',
        'Inspect suction strainers for particulate buildup',
      ],
      suggestedParts: [
        'Dual Mechanical Seal Kit - Plan 53A (SKU: MS-PUMP-420)',
        'Synthetic ISO VG 46 Turbine Oil (20 Liters)',
      ],
      justification: 'High operational hours (4,200 hrs since last seal flush audit). Historical SOP indicates seal plan pressure drop causes cavitation risk.',
      status: 'Active',
    },
    {
      assetId: boiler02 ? boiler02._id : null,
      assetCode: 'BOILER-02',
      title: 'Water-Tube Boiler Ultrasonic Tube Thickness & Safety Relief Valve Overhaul',
      category: 'Boilers',
      riskScore: 88,
      priority: 'CRITICAL',
      recommendedInterval: 'Annual Overhaul (8000 Hours)',
      actionItems: [
        'Perform NDT ultrasonic thickness gauging on superheater bank row 3',
        'Hydrostatic pressure test at 63 bar (1.5x design operating rating)',
        'Calibrate dual safety relief valves (SRV-201 & SRV-202)',
        'Clean dual-fired burner tips & test combustion fuel-air ratio',
      ],
      suggestedParts: [
        'Superheater Alloy Steel Tube Section (12 Meter)',
        'SRV High-Temp Graphite Gasket Pack',
      ],
      justification: 'Previous NDT overhaul log identified wall thinning down to 4.2 mm. Hydrostatic re-verification mandatory before peak steam demand.',
      status: 'Active',
    },
    {
      assetId: comp07 ? comp07._id : null,
      assetCode: 'COMP-07',
      title: 'Screw Air Compressor Lube Oil Filter Upgrade & Varnish Removal Audit',
      category: 'Compressors',
      riskScore: 92,
      priority: 'CRITICAL',
      recommendedInterval: '250 Operating Hours',
      actionItems: [
        'Replace 25-micron lube oil filter with upgraded 10-micron synthetic glass fibre element',
        'Flush oil bypass valve manifold to prevent bearing starvation',
        'Audit male screw bearing operating temperature (< 95°C limit)',
        'Check automatic condensate drain trap operation',
      ],
      suggestedParts: [
        '10-Micron Synthetic Glass Fibre Oil Filter Element (SKU: FLT-COMP-10M)',
        'Compressor Flush Solvent (15 Liters)',
      ],
      justification: 'Incident RCA-COMP-07 identified oil filter bypass debris blockage leading to bearing thermal trip (104°C). Immediate filter upgrade required.',
      status: 'Active',
    },
    {
      assetId: turbine04 ? turbine04._id : null,
      assetCode: 'TURBINE-04',
      title: 'Steam Turbine Governor Valve LVDT Calibration & Mechanical Overspeed Trip Test',
      category: 'Turbines',
      riskScore: 45,
      priority: 'MEDIUM',
      recommendedInterval: '8000 Operating Hours',
      actionItems: [
        'Calibrate governor control valve linear variable differential transformer (LVDT)',
        'Test mechanical overspeed trip bolt rig (Set trip speed to 6600 RPM)',
        'Sample turbine oil for ISO 4406 cleanliness particle count',
      ],
      suggestedParts: [
        'Governor Valve Packing Set',
        'LVDT Transducer Seal Ring',
      ],
      justification: 'Routine 8,000-hour turbine maintenance interval. Vibration and governor response currently within normal baseline.',
      status: 'Active',
    },
    {
      assetId: reactor05 ? reactor05._id : null,
      assetCode: 'REACTOR-05',
      title: 'Hastelloy CSTR Agitator Mechanical Seal Plan 54 Barrier Fluid Pressure Test',
      category: 'Reactors',
      riskScore: 62,
      priority: 'HIGH',
      recommendedInterval: '1000 Operating Hours',
      actionItems: [
        'Verify Plan 54 pressurized barrier fluid differential pressure (2.0 bar > vessel pressure)',
        'Inspect Hastelloy C-276 agitator shaft alignment and seal face wear',
        'Audit vessel jacket steam pressure relief valve',
      ],
      suggestedParts: [
        'Hastelloy C-276 Agitator Mechanical Seal Ring Set',
        'Plan 54 Barrier Fluid Filter',
      ],
      justification: 'Continuous chemical reaction environment. Seal barrier pressure stability is critical to prevent hazardous monomer leakage.',
      status: 'Active',
    },
  ];

  const created = [];
  for (const pmData of pmSchedules) {
    if (pmData.assetId) {
      let pm = await PMRecommendation.findOne({ assetCode: pmData.assetCode });
      if (!pm) {
        pm = await PMRecommendation.create(pmData);
        created.push(pm);
      } else {
        created.push(pm);
      }
    }
  }

  logger.info(`Seeded ${created.length} AI Preventive Maintenance Recommendations`);
  return created;
};
