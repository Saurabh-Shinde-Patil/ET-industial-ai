import Asset from '../models/assetModel.js';
import logger from '../config/logger.js';

export const seedInitialAssets = async () => {
  const demoAssets = [
    {
      assetCode: 'PUMP-101',
      name: 'High-Pressure Main Feedwater Centrifugal Pump',
      category: 'Pumps',
      location: 'Boiler House - Sector 1A',
      status: 'Operational',
      specifications: {
        flowRate: '450 m³/h',
        designPressure: '64 bar',
        operatingTemp: '145 °C',
        motorPower: '350 kW',
        impellerDiameter: '420 mm',
        sealType: 'Dual Mechanical Seal - Plan 53A',
      },
      installedDate: '2019-04-15',
    },
    {
      assetCode: 'BOILER-02',
      name: 'High-Pressure Industrial Water-Tube Steam Boiler',
      category: 'Boilers',
      location: 'Boiler House - Sector 1B',
      status: 'Operational',
      specifications: {
        steamCapacity: '50 Tons/hr',
        operatingPressure: '42 bar',
        superheatTemp: '450 °C',
        fuelType: 'Natural Gas / Heavy Fuel Oil Dual Fired',
        efficiency: '88.5%',
      },
      installedDate: '2018-08-20',
    },
    {
      assetCode: 'COMP-07',
      name: 'Multi-Stage Heavy Industrial Screw Air Compressor',
      category: 'Compressors',
      location: 'Compressor House - Bay 3',
      status: 'Under Maintenance',
      specifications: {
        freeAirDelivery: '85 m³/min',
        dischargePressure: '8.5 bar',
        motorRating: '450 HP / 335 kW',
        coolingType: 'Water Cooled',
        lubeOilCapacity: '120 Liters',
      },
      installedDate: '2021-01-10',
    },
    {
      assetCode: 'TURBINE-04',
      name: 'Multi-Stage Condensing Steam Turbine Generator',
      category: 'Turbines',
      location: 'Turbine Hall - Main Bay',
      status: 'Operational',
      specifications: {
        powerOutput: '12.5 MW',
        ratedSpeed: '6000 RPM',
        inletPressure: '40 bar',
        inletTemp: '440 °C',
        generatorVoltage: '11 kV',
      },
      installedDate: '2017-11-05',
    },
    {
      assetCode: 'HEX-12',
      name: 'Shell & Tube Feedwater Pre-Heater Heat Exchanger',
      category: 'Heat Exchangers',
      location: 'Utility Yard - Area C',
      status: 'Operational',
      specifications: {
        heatTransferArea: '320 m²',
        shellDesignPressure: '16 bar',
        tubeDesignPressure: '60 bar',
        shellFluid: 'Low Pressure Steam',
        tubeFluid: 'Demineralized Water',
      },
      installedDate: '2020-06-18',
    },
    {
      assetCode: 'CONVEYOR-03',
      name: 'Heavy-Duty Coal Handling Belt Conveyor',
      category: 'Conveyors',
      location: 'Material Handling Yard - Line 2',
      status: 'Operational',
      specifications: {
        beltWidth: '1200 mm',
        conveyingSpeed: '2.5 m/s',
        capacity: '600 Tons/hr',
        driveMotor: '90 kW Gearmotor',
        beltType: 'Steel Cord ST-1250',
      },
      installedDate: '2016-03-30',
    },
    {
      assetCode: 'XFRM-01',
      name: 'Main Plant Step-Down Oil-Filled Power Transformer',
      category: 'Transformers',
      location: 'Electrical Substation - Yard 1',
      status: 'Operational',
      specifications: {
        ratedCapacity: '25 MVA',
        primaryVoltage: '33 kV',
        secondaryVoltage: '11 kV',
        coolingClass: 'ONAF (Oil Natural Air Forced)',
        vectorGroup: 'Dyn11',
      },
      installedDate: '2015-10-12',
    },
    {
      assetCode: 'REACTOR-05',
      name: 'Jacketed Continuous Stirred Tank Chemical Reactor',
      category: 'Reactors',
      location: 'Process Block B - Level 2',
      status: 'Operational',
      specifications: {
        vesselVolume: '15,000 Liters',
        agitatorSpeed: '0 - 120 RPM Variable',
        jacketPressure: '6 bar',
        vesselDesignPressure: '10 bar / Full Vacuum',
        mocrMaterial: 'Hastelloy C-276 Clad Steel',
      },
      installedDate: '2022-04-05',
    },
    {
      assetCode: 'CHILLER-09',
      name: 'Industrial Centrifugal Water Chiller Unit',
      category: 'Chillers',
      location: 'HVAC Plant Room - Basement',
      status: 'Operational',
      specifications: {
        coolingCapacity: '1200 TR',
        refrigerant: 'R-134a',
        chilledWaterTempInOut: '12 °C / 7 °C',
        copEfficiency: '6.2',
        compressorMotor: '650 kW 3.3kV',
      },
      installedDate: '2020-11-22',
    },
  ];

  const created = [];
  for (const assetData of demoAssets) {
    let asset = await Asset.findOne({ assetCode: assetData.assetCode });
    if (!asset) {
      asset = await Asset.create(assetData);
      created.push(asset);
    } else {
      created.push(asset);
    }
  }

  // Set child asset VALVE-88 under BOILER-02 parent
  const boiler = created.find((a) => a.assetCode === 'BOILER-02');
  if (boiler) {
    let valve = await Asset.findOne({ assetCode: 'VALVE-88' });
    if (!valve) {
      await Asset.create({
        assetCode: 'VALVE-88',
        name: 'Motor-Operated Steam Emergency Isolation Valve (MOV)',
        category: 'Valves',
        parentAssetId: boiler._id,
        location: 'Boiler House - Main Steam Line',
        status: 'Operational',
        specifications: {
          nominalDiameter: 'DN 300 (12 inch)',
          pressureRating: 'PN 63',
          actuatorType: 'Electric Rotork IQ3',
          strokeTime: '12 seconds',
          bodyMaterial: 'ASTM A217 WC6 Alloy Steel',
        },
        installedDate: '2018-09-01',
      });
    }
  }

  logger.info(`Industrial Assets ready in database (10 Physical Assets + Sub-components)`);
  return created;
};
