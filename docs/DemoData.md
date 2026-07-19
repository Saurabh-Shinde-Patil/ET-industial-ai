# Synthetic Industrial Demo Dataset & Ground-Truth Test Matrix

## Project Name: Industrial Knowledge Intelligence – Unified Asset & Operations Brain
**Hackathon**: Economic Times AI Hackathon 2.0  
**Problem Statement**: PS-8 – AI for Industrial Knowledge Intelligence  
**Document Version**: 1.0.0  
**Status**: Pre-Ingestion Ground-Truth Reference  

---

## 1. Physical Industrial Assets (10 Primary Assets)

```json
[
  {
    "assetCode": "PUMP-101",
    "name": "High-Pressure Main Feedwater Centrifugal Pump",
    "category": "Pumps",
    "parentAssetId": null,
    "location": "Boiler House - Sector 1A",
    "status": "Operational",
    "specifications": {
      "flowRate": "450 m³/h",
      "designPressure": "64 bar",
      "operatingTemp": "145 °C",
      "motorPower": "350 kW",
      "impellerDiameter": "420 mm",
      "sealType": "Dual Mechanical Seal - Plan 53A"
    },
    "installedDate": "2019-04-15"
  },
  {
    "assetCode": "BOILER-02",
    "name": "High-Pressure Industrial Water-Tube Steam Boiler",
    "category": "Boilers",
    "parentAssetId": null,
    "location": "Boiler House - Sector 1B",
    "status": "Operational",
    "specifications": {
      "steamCapacity": "50 Tons/hr",
      "operatingPressure": "42 bar",
      "superheatTemp": "450 °C",
      "fuelType": "Natural Gas / Heavy Fuel Oil Dual Fired",
      "efficiency": "88.5%"
    },
    "installedDate": "2018-08-20"
  },
  {
    "assetCode": "COMP-07",
    "name": "Multi-Stage Heavy Industrial Screw Air Compressor",
    "category": "Compressors",
    "parentAssetId": null,
    "location": "Compressor House - Bay 3",
    "status": "Under Maintenance",
    "specifications": {
      "freeAirDelivery": "85 m³/min",
      "dischargePressure": "8.5 bar",
      "motorRating": "450 HP / 335 kW",
      "coolingType": "Water Cooled",
      "lubeOilCapacity": "120 Liters"
    },
    "installedDate": "2021-01-10"
  },
  {
    "assetCode": "TURBINE-04",
    "name": "Multi-Stage Condensing Steam Turbine Generator",
    "category": "Turbines",
    "parentAssetId": null,
    "location": "Turbine Hall - Main Bay",
    "status": "Operational",
    "specifications": {
      "powerOutput": "12.5 MW",
      "ratedSpeed": "6000 RPM",
      "inletPressure": "40 bar",
      "inletTemp": "440 °C",
      "generatorVoltage": "11 kV"
    },
    "installedDate": "2017-11-05"
  },
  {
    "assetCode": "HEX-12",
    "name": "Shell & Tube Feedwater Pre-Heater Heat Exchanger",
    "category": "Heat Exchangers",
    "parentAssetId": null,
    "location": "Utility Yard - Area C",
    "status": "Operational",
    "specifications": {
      "heatTransferArea": "320 m²",
      "shellDesignPressure": "16 bar",
      "tubeDesignPressure": "60 bar",
      "shellFluid": "Low Pressure Steam",
      "tubeFluid": "Demineralized Water"
    },
    "installedDate": "2020-06-18"
  },
  {
    "assetCode": "VALVE-88",
    "name": "Motor-Operated Steam Emergency Isolation Valve (MOV)",
    "category": "Valves",
    "parentAssetId": "BOILER-02",
    "location": "Boiler House - Main Steam Line",
    "status": "Operational",
    "specifications": {
      "nominalDiameter": "DN 300 (12 inch)",
      "pressureRating": "PN 63",
      "actuatorType": "Electric Rotork IQ3",
      "strokeTime": "12 seconds",
      "bodyMaterial": "ASTM A217 WC6 Alloy Steel"
    },
    "installedDate": "2018-09-01"
  },
  {
    "assetCode": "CONVEYOR-03",
    "name": "Heavy-Duty Coal Handling Belt Conveyor",
    "category": "Conveyors",
    "parentAssetId": null,
    "location": "Material Handling Yard - Line 2",
    "status": "Operational",
    "specifications": {
      "beltWidth": "1200 mm",
      "conveyingSpeed": "2.5 m/s",
      "capacity": "600 Tons/hr",
      "driveMotor": "90 kW Gearmotor",
      "beltType": "Steel Cord ST-1250"
    },
    "installedDate": "2016-03-30"
  },
  {
    "assetCode": "XFRM-01",
    "name": "Main Plant Step-Down Oil-Filled Power Transformer",
    "category": "Transformers",
    "parentAssetId": null,
    "location": "Electrical Substation - Yard 1",
    "status": "Operational",
    "specifications": {
      "ratedCapacity": "25 MVA",
      "primaryVoltage": "33 kV",
      "secondaryVoltage": "11 kV",
      "coolingClass": "ONAF (Oil Natural Air Forced)",
      "vectorGroup": "Dyn11"
    },
    "installedDate": "2015-10-12"
  },
  {
    "assetCode": "REACTOR-05",
    "name": "Jacketed Continuous Stirred Tank Chemical Reactor",
    "category": "Reactors",
    "parentAssetId": null,
    "location": "Process Block B - Level 2",
    "status": "Operational",
    "specifications": {
      "vesselVolume": "15,000 Liters",
      "agitatorSpeed": "0 - 120 RPM Variable",
      "jacketPressure": "6 bar",
      "vesselDesignPressure": "10 bar / Full Vacuum",
      "mocrMaterial": "Hastelloy C-276 Clad Steel"
    },
    "installedDate": "2022-04-05"
  },
  {
    "assetCode": "CHILLER-09",
    "name": "Industrial Centrifugal Water Chiller Unit",
    "category": "Chillers",
    "parentAssetId": null,
    "location": "HVAC Plant Room - Basement",
    "status": "Operational",
    "specifications": {
      "coolingCapacity": "1200 TR (Tons of Refrigeration)",
      "refrigerant": "R-134a",
      "chilledWaterTempInOut": "12 °C / 7 °C",
      "copEfficiency": "6.2",
      "compressorMotor": "650 kW 3.3kV"
    },
    "installedDate": "2020-11-22"
  }
]
```

---

## 2. Standard Operating Procedures (20 Sample SOPs)

1. **SOP-PUMP-101-START**: Pre-Start Inspection & Cold Startup Procedure for Feedwater Pump PUMP-101. (Mandatory priming, Plan 53A barrier fluid pressure verification at 4.0 bar, minimum flow valve opening).
2. **SOP-PUMP-101-STOP**: Controlled Shutdown & Isolation Sequence for PUMP-101.
3. **SOP-BOILER-02-WARMUP**: Cold Warm-Up & Pressure Raising Procedure for Boiler BOILER-02. (Purge vent for 3 minutes, raise pressure at max 1.5 bar/min).
4. **SOP-BOILER-02-EMERGENCY**: Emergency Trip & Flue Gas Purge Sequence for BOILER-02.
5. **SOP-COMP-07-START**: Normal Start & Unloaded Warmup Routine for Air Compressor COMP-07.
6. **SOP-COMP-07-DESICCANT**: Desiccant Dryer Regenerative Cycle Adjustment for COMP-07.
7. **SOP-TURBINE-04-ROLL**: Cold Roll-Up & Synchronizing Procedure for Steam Turbine TURBINE-04. (Soak at 1200 RPM for 20 mins; monitor casing differential expansion).
8. **SOP-TURBINE-04-TRIP**: Manual Emergency Trip Test & Overspeed Trip Check for TURBINE-04.
9. **SOP-HEX-12-CLEAN**: Chemical Descaling & Passivation Flush Procedure for Heat Exchanger HEX-12.
10. **SOP-VALVE-88-STROKE**: Quarterly Full-Stroke Calibration & Emergency Close Test for Valve VALVE-88.
11. **SOP-CONVEYOR-03-ALIGN**: Belt Alignment & Tensioning Adjustment Procedure for Conveyor CONVEYOR-03.
12. **SOP-CONVEYOR-03-SAFETY**: Pull-Cord Safety Switch & Zero-Speed Switch Functional Testing for CONVEYOR-03.
13. **SOP-XFRM-01-DGA**: Dissolved Gas Analysis (DGA) Oil Sampling Procedure for Transformer XFRM-01.
14. **SOP-REACTOR-05-CHARGE**: Raw Material Charging & Catalyst Dosing Protocol for Reactor REACTOR-05.
15. **SOP-REACTOR-05-LEAK**: High-Pressure Nitrogen Pressure Decay Leak Test for REACTOR-05.
16. **SOP-CHILLER-09-START**: Seasonal Startup & Condenser Water Temperature Stabilization for Chiller CHILLER-09.
17. **SOP-SAFETY-LOTO-01**: Lockout/Tagout (LOTO) General Electrical Isolation Standard Operating Procedure.
18. **SOP-SAFETY-CONFINED-02**: Confined Space Entry & Continuous Gas Monitoring Protocol for Vessels and Boilers.
19. **SOP-SAFETY-HOTWORK-03**: Hot Work Permit & Spark Containment Standard for Welding near Process Lines.
20. **SOP-SHIFT-HANDOVER**: Operator Shift Handover & Logbook Reconciliation Standard.

---

## 3. Maintenance Logs (15 Sample Logs)

1. **LOG-2025-0101** (PUMP-101): Replaced inboard mechanical seal (Plan 53A). Seal faces scored due to particulate contamination. Flushing fluid replaced. Downtime: 8 hours.
2. **LOG-2025-0114** (BOILER-02): Annual soot blower nozzle inspection and safety relief valve bench testing at 46 bar. All valves popped within ±1% tolerance. Downtime: 24 hours.
3. **LOG-2025-0202** (COMP-07): Unscheduled trip due to high discharge air temperature (112 °C). Cleaned oil cooler tubes and replaced thermal bypass valve element. Downtime: 6 hours.
4. **LOG-2025-0218** (TURBINE-04): Minor governor valve stem packing leak repaired. Tightened gland nut to 120 Nm torque. Downtime: 2 hours (load reduced).
5. **LOG-2025-0305** (HEX-12): Flange gasket leak on tube-side demag inlet flange. Replaced spiral wound ASME B16.20 gasket. Downtime: 4 hours.
6. **LOG-2025-0322** (CONVEYOR-03): Replaced worn tail drum pulley lagging rubber sheet and realigned belt tracking switches. Downtime: 5 hours.
7. **LOG-2025-0410** (XFRM-01): Annual oil purification and vacuum degassing. DGA test indicated minor ethylene trace within acceptable limits. Downtime: 12 hours.
8. **LOG-2025-0428** (REACTOR-05): Replaced mechanical agitator dry seal cartridge. Torqued mounting bolts to 185 Nm. Downtime: 14 hours.
9. **LOG-2025-0515** (CHILLER-09): Eddy current testing on condenser tubes. 4 tubes plugged due to wall loss >50%. Refrigerant charge topped up by 15 kg R-134a. Downtime: 36 hours.
10. **LOG-2025-0601** (VALVE-88): Actuator gearbox oil changed (Mobilgear 600 XP 220). Limit switches recalibrated for 100% tight shutoff. Downtime: 3 hours.
11. **LOG-2025-0620** (PUMP-101): Vibration analysis revealed 1X rotational unbalance. Dynamic balancing of impeller executed on-site. Vibration dropped from 6.8 mm/s to 1.1 mm/s RMS. Downtime: 10 hours.
12. **LOG-2025-0708** (BOILER-02): Burner tip cleaning and oxygen sensor recalibration. Combustion air-fuel ratio optimized to 2.5% excess O2. Downtime: 6 hours.
13. **LOG-2025-0802** (COMP-07): Replaced air intake filter elements and separator cartridge. Differential pressure restored to 0.15 bar. Downtime: 3 hours.
14. **LOG-2025-0819** (CONVEYOR-03): Replaced drive gearmotor oil seal and 3 broken troughing idler rollers. Downtime: 4 hours.
15. **LOG-2025-0905** (REACTOR-05): Calibrated internal temperature RTD sensors PT100 against master calibrator. Zero drift detected. Downtime: 2 hours.

---

## 4. Root Cause Analysis (RCA) Incident Reports (10 Reports)

1. **RCA-INC-2024-01**: **Compressor COMP-07 Bearing Seizure Incident**. (Root Cause: Lube oil starvation caused by clogged oil filter bypass valve during cold startup; Corrective Action: Installed differential pressure interlock trip).
2. **RCA-INC-2024-02**: **Boiler BOILER-02 Flame Out & Feedwater Cavitation**. (Root Cause: Deaerator level transmitter drift causing low NPSH to PUMP-101; Corrective Action: Redundant 2-out-of-3 voting transmitters installed).
3. **RCA-INC-2024-03**: **Steam Turbine TURBINE-04 High Vibration Trip (14.2 mm/s)**. (Root Cause: Thermal bow on rotor shaft due to rapid startup without adequate warm-up soak; Corrective Action: Mandatory 20-minute soak at 1200 RPM added to startup PLC logic).
4. **RCA-INC-2024-04**: **Transformer XFRM-01 Buchholz Relay Alarm**. (Root Cause: Micro-arcing in tap changer selector contact; Corrective Action: Tap changer overhauled and oil flushed).
5. **RCA-INC-2024-05**: **Reactor REACTOR-05 Runaway Exotherm Hazard**. (Root Cause: Cooling jacket control valve stuck 40% open due to instrument air moisture freeze; Corrective Action: Heat tracing installed on instrument air lines).
6. **RCA-INC-2024-06**: **Valve VALVE-88 Failure to Close on Trip Signal**. (Root Cause: Actuator torque switch set too low, tripping on mechanical friction before full seat contact; Corrective Action: Torque switch recalibrated to 135 Nm).
7. **RCA-INC-2024-07**: **Conveyor CONVEYOR-03 Belt Tear Incident**. (Root Cause: Tramp iron plate jammed between chute skirt and belt; Corrective Action: Over-belt magnetic separator installed at transfer point).
8. **RCA-INC-2024-08**: **Chiller CHILLER-09 Low Evaporator Pressure Trip**. (Root Cause: Chilled water pump strainer 90% clogged with rust flakes; Corrective Action: Weekly strainer differential pressure check added to PM schedule).
9. **RCA-INC-2024-09**: **Heat Exchanger HEX-12 Tube Sheet Leak**. (Root Cause: Thermal shock induced by sudden opening of high-pressure steam valve; Corrective Action: Installed motorized bypass valve for gradual warm-up).
10. **RCA-INC-2024-10**: **Pump PUMP-101 Mechanical Seal Failure**. (Root Cause: Barrier fluid reservoir Plan 53A accumulator nitrogen pressure dropped below barrier fluid static head; Corrective Action: Monthly N2 charge check implemented).

---

## 5. Preventive Maintenance Schedules (5 Schedules)

1. **PM-SCH-PUMP-101**: Monthly vibration analysis, Plan 53A barrier oil replenishment, coupling alignment check (Max allowable misalignment: 0.05 mm TIR), bearing grease replenishment every 2000 operating hours.
2. **PM-SCH-BOILER-02**: Weekly water chemistry check (pH 9.5-10.5, silica <0.02 ppm), monthly burner flame scanner cleaning, quarterly safety valve pop test, bi-annual sootblower overhaul.
3. **PM-SCH-COMP-07**: 500-hour oil filter replacement, 1000-hour air filter replacement, 4000-hour oil separator replacement, annual cooler tube descaling.
4. **PM-SCH-TURBINE-04**: Daily lube oil temperature/pressure logging, weekly overspeed trip solenoid test, monthly oil DGA analysis, annual main stop valve internal inspection.
5. **PM-SCH-CONVEYOR-03**: Weekly belt pull-cord trip test, monthly idler roller spin check, bi-monthly gearbox oil sampling, quarterly belt splice ultrasonic inspection.

---

## 6. Vendor Engineering Manuals (5 Manuals)

1. **MANUAL-PUMP-101**: *Flowserve Heavy-Duty Feedwater Centrifugal Pump Operations & Maintenance Manual (Doc ID: FS-MNL-8842)*. Bolt torque specifications: Casing studs = 450 Nm, Impeller nut = 320 Nm (Left-hand thread). Bearing clearance: 0.08 - 0.12 mm.
2. **MANUAL-BOILER-02**: *Babcock & Wilcox Industrial Water-Tube Boiler Technical Manual (Doc ID: BW-IB-440)*. Maximum allowable drum pressure rate: 1.5 bar/minute. Cold startup warm-up curve: 50 °C/hour ramp rate.
3. **MANUAL-COMP-07**: *Atlas Copco ZR-Series Oil-Free Screw Compressor Repair Specification (Doc ID: AC-ZR-900)*. Rotor interlobe clearance: 0.15 mm. Maximum discharge temp shutoff limit: 120 °C.
4. **MANUAL-TURBINE-04**: *Siemens SST-300 Steam Turbine Installation & Service Guide (Doc ID: SIE-SST300-V4)*. Casing differential expansion alarm limit: +4.5 mm / -2.0 mm. Rotor trip overspeed limit: 6600 RPM (110% of rated 6000 RPM).
5. **MANUAL-REACTOR-05**: *Pfaudler Hastelloy Jacketed Reactor Maintenance Handbook (Doc ID: PF-RX-15K)*. Agitator mechanical seal flush rate: 5 Liters/min at 1.5 bar above vessel pressure. Vessel hydrostatic test pressure: 15 bar.

---

## 7. Example AI Queries & Ground-Truth Expected Answers

### Query 1
> **User**: "Show maintenance history of Pump-102 or Pump-101."
>
> **Ground-Truth Expected Answer**:  
> "Here is the maintenance history for **High-Pressure Main Feedwater Pump (PUMP-101)**:
> - **Jan 01, 2025** (Breakdown): Replaced inboard Plan 53A dual mechanical seal due to face scoring from particulate contamination. Barrier fluid flushed. (Downtime: 8 hrs)
> - **Jun 20, 2025** (Preventive): On-site dynamic balancing performed following 1X rotational unbalance vibration alert. Vibration reduced from 6.8 mm/s to 1.1 mm/s RMS. (Downtime: 10 hrs)
> - **Oct 2024** (RCA Incident): Mechanical seal failure caused by N2 pressure drop in Plan 53A accumulator.
> 
> *Citations: [LOG-2025-0101.pdf, Pg 1] [LOG-2025-0620.pdf, Pg 1] [RCA-INC-2024-10.pdf, Pg 2]*  
> **Confidence Score**: 96% (High)"

---

### Query 2
> **User**: "Why did Compressor-7 fail last year?"
>
> **Ground-Truth Expected Answer**:  
> "**Compressor-7 (COMP-07)** experienced a major bearing seizure incident (**RCA-INC-2024-01**).
> - **Root Cause**: Lube oil starvation caused by a clogged oil filter bypass valve during a cold startup. The oil filter differential pressure exceeded normal limits, but the bypass valve failed to open, starving the high-stage screw bearings.
> - **Corrective Actions Taken**: Installed an electronic differential pressure interlock trip that prevents compressor startup if oil filter differential pressure exceeds 0.8 bar.
> 
> *Citations: [RCA-INC-2024-01.pdf, Pg 1-3]*  
> **Confidence Score**: 98% (High)"

---

### Query 3
> **User**: "Show SOP before starting Boiler-3 or Boiler-2."
>
> **Ground-Truth Expected Answer**:  
> "Before starting **Water-Tube Steam Boiler (BOILER-02)**, follow **SOP-BOILER-02-WARMUP**:
> 
> 1. Verify water level in steam drum is at normal operating level (+25 mm).
> 2. Open drum air vent valve and superheater drain valves.
> 3. Perform 3-minute mandatory furnace purge with combustion air fan at 40% flow.
> 4. Light pilot burner on Natural Gas; verify flame signal strength > 80%.
> 5. Raise pressure gradually at a maximum rate of **1.5 bar/minute** (do not exceed 50 °C/hour temperature ramp rate).
> 
> ⚠️ **SAFETY WARNING**: Ensure flue gas vent purging is completed prior to ignition to prevent unburned gas accumulation.
> 
> *Citations: [SOP-BOILER-02-WARMUP.pdf, Pg 2-4] [MANUAL-BOILER-02.pdf, Pg 18]*  
> **Confidence Score**: 95% (High)"

---

### Query 4
> **User**: "Suggest preventive maintenance for Pump-101."
>
> **Ground-Truth Expected Answer**:  
> "Based on historical maintenance logs and vendor specifications for **PUMP-101**:
> 1. **Monthly Vibration Analysis**: Monitor 1X rotational unbalance and bearing pass frequencies (Keep below 2.5 mm/s RMS).
> 2. **Plan 53A Accumulator Check**: Check N2 barrier fluid accumulator pressure monthly to prevent seal face scoring.
> 3. **Bearing Lubrication**: Replenish Mobil SHC 630 bearing grease every 2,000 operating hours.
> 4. **Shaft Alignment Verification**: Check laser alignment during bi-annual outage (Max allowable misalignment: 0.05 mm TIR).
> 
> *Citations: [PM-SCH-PUMP-101.pdf, Pg 1] [MANUAL-PUMP-101.pdf, Pg 12]*  
> **Confidence Score**: 92% (High)"

---

### Query 5 (Out-of-Bounds / Unknown Query)
> **User**: "What is the optimal coolant temperature for Nuclear Reactor Core-9?"
>
> **Ground-Truth Expected Answer**:  
> "Information regarding 'Nuclear Reactor Core-9' is not found in current plant documentation. The plant knowledge base only contains manuals for industrial chemical reactors (e.g., REACTOR-05), boilers, pumps, and compressors. Please consult a domain expert or upload relevant documentation.
> 
> **Confidence Score**: 35% (Low - Generation Suppressed)"
