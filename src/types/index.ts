// Core Calculation Interfaces

// Shell (UG-27)
export interface ShellInput {
  designPressure: number;      // MPa
  innerRadius: number;          // mm
  allowableStress: number;      // MPa
  jointEfficiency: number;      // 0.6 - 1.0
  corrosionAllowance: number;   // mm
  shellType: 'cylindrical' | 'spherical';
}

export interface ShellResult {
  requiredThickness_mm: number;
  governingStress: 'circumferential' | 'longitudinal';
  codeLimitCheck: { passed: boolean; message: string };
  thicknessWithCA: number;
}

// Head (UG-32)
export type HeadType = 'ellipsoidal' | 'torispherical' | 'hemispherical' | 'conical' | 'toriconical' | 'flat';

export interface HeadInput {
  headType: HeadType;
  designPressure: number;
  diameter: number;           // mm (ID)
  allowableStress: number;
  jointEfficiency: number;
  corrosionAllowance: number;
  crownRadius?: number;       // L for torispherical
  knuckleRadius?: number;     // r for torispherical
  halfApexAngle?: number;     // degrees for conical/toriconical
  attachmentC?: number;       // C factor for flat head
}

export interface HeadResult {
  requiredThickness_mm: number;
  codeReference: string;
  codeLimitCheck: { passed: boolean; message: string };
  thicknessWithCA: number;
  headInsideDepth: number;
  headSurfaceArea: number;
  headVolume: number;
}

// Nozzle Reinforcement (UG-37)
export interface NozzleInput {
  openingDiameter: number;
  shellRequiredThickness: number;
  shellNominalThickness: number;
  nozzleNominalThickness: number;
  nozzleRequiredThickness: number;
  corrosionAllowance: number;
  reinforcementPadOD?: number;
  reinforcementPadThickness?: number;
  weldLegSize?: number;
  weldCount?: number;
  fR1?: number;
  fR2?: number;
  fFactor?: number;
}

export interface NozzleResult {
  areaRequired: number;
  areaAvailable: { A1: number; A2: number; A3: number; A4: number; total: number };
  adequacy: 'PASS' | 'FAIL';
  excessArea: number;
  padRequired: boolean;
  limitsOfReinforcement: { horizontal: number; vertical: number };
}

// MAWP
export interface MAWPInput {
  shellNominalThickness: number;
  headNominalThickness: number;
  headType: HeadType;
  nozzleData: NozzleInput[];
  allowableStress: number;
  jointEfficiency: number;
  corrosionAllowance: number;
  innerRadius: number;
}

export interface MAWPResult {
  MAWP: number;
  governingComponent: string;
  componentMAWPs: {
    shell: number;
    head: number;
    nozzles: { tag: string; mawp: number }[];
  };
  hydrotestPressure: number;
}

// Hydrotest (UG-99)
export interface HydrotestInput {
  MAWP: number;
  materialDesignation: string;
  designTemperature: number;
  testTemperature: number;
  testType: 'hydrostatic' | 'pneumatic';
}

export interface HydrotestResult {
  testPressure: number;
  stressRatio: number;
  testStressFraction: number;
  warning?: string;
}

// Heat Exchanger
export interface HXThermalInput {
  hotInletTemp: number;
  hotOutletTemp: number;
  hotFlowRate: number;
  hotCp: number;
  hotDensity: number;
  hotViscosity: number;
  hotConductivity: number;
  hotFouling: number;
  coldInletTemp: number;
  coldOutletTemp: number;
  coldFlowRate: number;
  coldCp: number;
  coldDensity: number;
  coldViscosity: number;
  coldConductivity: number;
  coldFouling: number;
  flowArrangement: 'counter-current' | 'co-current' | '1-2' | '2-4';
  tubeOD: number;
  tubeID: number;
  tubeLength: number;
  tubeMaterial: string;
  tubePasses: number;
  tubeCount: number;
  shellID: number;
  baffleSpacing: number;
  baffleCut: number;
  pitchRatio: number;
  pitchPattern: 'triangular' | 'square' | 'rotated-square';
}

export interface HXThermalResult {
  heatDuty: number;
  LMTD: number;
  ftCorrection: number;
  overallHTC_clean: number;
  overallHTC_dirty: number;
  requiredArea: number;
  providedArea: number;
  overDesign: number;
  tubeSideHTC: number;
  shellSideHTC: number;
  tubeSidePressureDrop: number;
  shellSidePressureDrop: number;
}

// Material (ASME II Part D)
export interface ASMEMaterial {
  designation: string;
  specNumber: string;
  grade?: string;
  type: 'plate' | 'forging' | 'pipe' | 'tube' | 'bolt' | 'bar';
  productForm: string;
  UNSnumber?: string;
  PNumber: number;
  groupNumber?: number;
  allowableStressTable: {
    temperature_C: number;
    stress_MPa: number;
  }[];
  yieldStrength_MPa: number;
  tensileStrength_MPa: number;
  maxDesignTemp_C: number;
  minTempTestExempt_C: number;
  externalPressureChart: string;
  density_kg_m3: number;
  notes: string[];
}

// Weight
export interface WeightBreakdown {
  shell: number;
  heads: number;
  nozzles: number;
  supports: number;
  internals: number;
  insulation: number;
  paint: number;
  boltsNuts: number;
  totalEmpty: number;
  totalOperating: number;
  totalHydrotest: number;
}

// Cost
export interface CostBreakdown {
  materialCost: number;
  fabricationCost: number;
  engineeringCost: number;
  inspectionCost: number;
  overhead: number;
  contingency: number;
  subtotal: number;
  totalEstimate: number;
  rangeLow: number;
  rangeHigh: number;
  unit: string;
  costPerKg: number;
}

// Store types
export interface VesselProject {
  id: string;
  name: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
  designPressure: number;
  designTemperature: number;
  material: string;
  jointEfficiency: number;
  corrosionAllowance: number;
  shellID: number;
  shellLength: number;
  shellThickness: number;
  topHead: HeadInput;
  bottomHead: HeadInput;
  nozzles: NozzleInput[];
}

export interface HXProject {
  id: string;
  name: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
  thermalInput: HXThermalInput;
  temaType: string;
}

export interface AppSettings {
  units: 'metric' | 'imperial';
  language: 'en' | 'id';
  defaultMaterial: string;
  defaultJointEfficiency: number;
  defaultCorrosionAllowance: number;
  theme: 'light' | 'dark' | 'system';
  autoRecalculate: boolean;
  showFormulas: boolean;
  decimalPlaces: number;
  companyName: string;
  engineerName: string;
}