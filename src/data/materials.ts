import type { ASMEMaterial } from '@/types';

export const MATERIAL_DATABASE: ASMEMaterial[] = [
  {
    designation: 'SA-516 Gr.70',
    specNumber: 'SA-516',
    grade: '70',
    type: 'plate',
    productForm: 'Carbon steel plate, moderate/lower temp service',
    UNSnumber: 'K02700',
    PNumber: 1,
    groupNumber: 2,
    yieldStrength_MPa: 260,
    tensileStrength_MPa: 485,
    maxDesignTemp_C: 538,
    minTempTestExempt_C: -29,
    externalPressureChart: 'CS-2',
    density_kg_m3: 7850,
    notes: ['Most common pressure vessel plate', 'Impact tested per SA-516 requirements'],
    allowableStressTable: [
      { temperature_C: -30, stress_MPa: 162 },
      { temperature_C: 100, stress_MPa: 162 },
      { temperature_C: 150, stress_MPa: 162 },
      { temperature_C: 200, stress_MPa: 162 },
      { temperature_C: 250, stress_MPa: 162 },
      { temperature_C: 300, stress_MPa: 154 },
      { temperature_C: 325, stress_MPa: 149 },
      { temperature_C: 350, stress_MPa: 143 },
      { temperature_C: 375, stress_MPa: 131 },
      { temperature_C: 400, stress_MPa: 117 },
      { temperature_C: 425, stress_MPa: 94 },
      { temperature_C: 450, stress_MPa: 70 },
      { temperature_C: 475, stress_MPa: 49 },
      { temperature_C: 500, stress_MPa: 33 },
      { temperature_C: 525, stress_MPa: 21 },
      { temperature_C: 538, stress_MPa: 14 }
    ]
  },
  {
    designation: 'SA-516 Gr.60',
    specNumber: 'SA-516',
    grade: '60',
    type: 'plate',
    productForm: 'Carbon steel plate, moderate/lower temp service',
    UNSnumber: 'K02100',
    PNumber: 1,
    groupNumber: 1,
    yieldStrength_MPa: 220,
    tensileStrength_MPa: 415,
    maxDesignTemp_C: 538,
    minTempTestExempt_C: -46,
    externalPressureChart: 'CS-2',
    density_kg_m3: 7850,
    notes: ['Better weldability than Gr.70', 'Lower impact test exemption temperature'],
    allowableStressTable: [
      { temperature_C: -40, stress_MPa: 138 },
      { temperature_C: 100, stress_MPa: 138 },
      { temperature_C: 200, stress_MPa: 138 },
      { temperature_C: 250, stress_MPa: 138 },
      { temperature_C: 300, stress_MPa: 131 },
      { temperature_C: 350, stress_MPa: 120 },
      { temperature_C: 400, stress_MPa: 100 },
      { temperature_C: 450, stress_MPa: 66 },
      { temperature_C: 500, stress_MPa: 36 },
      { temperature_C: 538, stress_MPa: 14 }
    ]
  },
  {
    designation: 'SA-285 Gr.C',
    specNumber: 'SA-285',
    grade: 'C',
    type: 'plate',
    productForm: 'Carbon steel plate, low-stress service',
    UNSnumber: 'K02801',
    PNumber: 1,
    groupNumber: 1,
    yieldStrength_MPa: 205,
    tensileStrength_MPa: 380,
    maxDesignTemp_C: 538,
    minTempTestExempt_C: -29,
    externalPressureChart: 'CS-2',
    density_kg_m3: 7850,
    notes: ['Low-stress service', 'Lower strength than SA-516'],
    allowableStressTable: [
      { temperature_C: -30, stress_MPa: 126 },
      { temperature_C: 100, stress_MPa: 126 },
      { temperature_C: 200, stress_MPa: 126 },
      { temperature_C: 250, stress_MPa: 126 },
      { temperature_C: 300, stress_MPa: 120 },
      { temperature_C: 350, stress_MPa: 110 },
      { temperature_C: 400, stress_MPa: 91 },
      { temperature_C: 450, stress_MPa: 60 },
      { temperature_C: 500, stress_MPa: 33 },
      { temperature_C: 538, stress_MPa: 14 }
    ]
  },
  {
    designation: 'SA-387 Gr.22 Cl.2',
    specNumber: 'SA-387',
    grade: '22',
    type: 'plate',
    productForm: 'Chrome-moly steel plate, high temp service',
    UNSnumber: 'K21590',
    PNumber: 5A,
    groupNumber: 1,
    yieldStrength_MPa: 310,
    tensileStrength_MPa: 515,
    maxDesignTemp_C: 650,
    minTempTestExempt_C: -29,
    externalPressureChart: 'CS-4',
    density_kg_m3: 7850,
    notes: ['Cr-Mo alloy for high temperature', 'Creep resistance'],
    allowableStressTable: [
      { temperature_C: 100, stress_MPa: 172 },
      { temperature_C: 200, stress_MPa: 172 },
      { temperature_C: 300, stress_MPa: 172 },
      { temperature_C: 350, stress_MPa: 172 },
      { temperature_C: 400, stress_MPa: 172 },
      { temperature_C: 425, stress_MPa: 171 },
      { temperature_C: 450, stress_MPa: 169 },
      { temperature_C: 475, stress_MPa: 165 },
      { temperature_C: 500, stress_MPa: 159 },
      { temperature_C: 525, stress_MPa: 149 },
      { temperature_C: 550, stress_MPa: 134 },
      { temperature_C: 575, stress_MPa: 113 },
      { temperature_C: 600, stress_MPa: 86 },
      { temperature_C: 625, stress_MPa: 59 },
      { temperature_C: 650, stress_MPa: 38 }
    ]
  },
  {
    designation: 'SA-240 304',
    specNumber: 'SA-240',
    grade: '304',
    type: 'plate',
    productForm: 'Austenitic stainless steel plate',
    UNSnumber: 'S30400',
    PNumber: 8,
    groupNumber: 1,
    yieldStrength_MPa: 205,
    tensileStrength_MPa: 515,
    maxDesignTemp_C: 816,
    minTempTestExempt_C: -196,
    externalPressureChart: 'HA-1',
    density_kg_m3: 8000,
    notes: ['Standard austenitic stainless', 'Good corrosion resistance'],
    allowableStressTable: [
      { temperature_C: -196, stress_MPa: 130 },
      { temperature_C: 100, stress_MPa: 130 },
      { temperature_C: 200, stress_MPa: 115 },
      { temperature_C: 300, stress_MPa: 101 },
      { temperature_C: 400, stress_MPa: 90 },
      { temperature_C: 500, stress_MPa: 80 },
      { temperature_C: 600, stress_MPa: 70 },
      { temperature_C: 650, stress_MPa: 65 },
      { temperature_C: 700, stress_MPa: 52 },
      { temperature_C: 750, stress_MPa: 35 },
      { temperature_C: 800, stress_MPa: 24 },
      { temperature_C: 816, stress_MPa: 19 }
    ]
  },
  {
    designation: 'SA-240 316L',
    specNumber: 'SA-240',
    grade: '316L',
    type: 'plate',
    productForm: 'Austenitic stainless steel plate, low carbon',
    UNSnumber: 'S31603',
    PNumber: 8,
    groupNumber: 1,
    yieldStrength_MPa: 170,
    tensileStrength_MPa: 485,
    maxDesignTemp_C: 816,
    minTempTestExempt_C: -196,
    externalPressureChart: 'HA-4',
    density_kg_m3: 8000,
    notes: ['Low carbon version of 316', 'Excellent corrosion resistance'],
    allowableStressTable: [
      { temperature_C: -196, stress_MPa: 115 },
      { temperature_C: 100, stress_MPa: 115 },
      { temperature_C: 200, stress_MPa: 102 },
      { temperature_C: 300, stress_MPa: 90 },
      { temperature_C: 400, stress_MPa: 80 },
      { temperature_C: 500, stress_MPa: 71 },
      { temperature_C: 600, stress_MPa: 61 },
      { temperature_C: 650, stress_MPa: 56 },
      { temperature_C: 700, stress_MPa: 45 },
      { temperature_C: 750, stress_MPa: 31 },
      { temperature_C: 800, stress_MPa: 21 },
      { temperature_C: 816, stress_MPa: 17 }
    ]
  },
  {
    designation: 'SA-240 316',
    specNumber: 'SA-240',
    grade: '316',
    type: 'plate',
    productForm: 'Austenitic stainless steel plate',
    UNSnumber: 'S31600',
    PNumber: 8,
    groupNumber: 1,
    yieldStrength_MPa: 205,
    tensileStrength_MPa: 515,
    maxDesignTemp_C: 816,
    minTempTestExempt_C: -196,
    externalPressureChart: 'HA-2',
    density_kg_m3: 8000,
    notes: ['Standard 316 stainless', 'Good corrosion resistance'],
    allowableStressTable: [
      { temperature_C: -196, stress_MPa: 130 },
      { temperature_C: 100, stress_MPa: 130 },
      { temperature_C: 200, stress_MPa: 115 },
      { temperature_C: 300, stress_MPa: 101 },
      { temperature_C: 400, stress_MPa: 90 },
      { temperature_C: 500, stress_MPa: 80 },
      { temperature_C: 600, stress_MPa: 70 },
      { temperature_C: 650, stress_MPa: 65 },
      { temperature_C: 700, stress_MPa: 52 },
      { temperature_C: 750, stress_MPa: 35 },
      { temperature_C: 800, stress_MPa: 24 },
      { temperature_C: 816, stress_MPa: 19 }
    ]
  },
  {
    designation: 'SA-106 Gr.B',
    specNumber: 'SA-106',
    grade: 'B',
    type: 'pipe',
    productForm: 'Seamless carbon steel pipe for high-temp service',
    UNSnumber: 'K03006',
    PNumber: 1,
    groupNumber: 1,
    yieldStrength_MPa: 240,
    tensileStrength_MPa: 415,
    maxDesignTemp_C: 538,
    minTempTestExempt_C: -29,
    externalPressureChart: 'CS-2',
    density_kg_m3: 7850,
    notes: ['Most common seamless pipe for pressure vessel nozzles'],
    allowableStressTable: [
      { temperature_C: -30, stress_MPa: 138 },
      { temperature_C: 100, stress_MPa: 138 },
      { temperature_C: 200, stress_MPa: 138 },
      { temperature_C: 300, stress_MPa: 131 },
      { temperature_C: 350, stress_MPa: 120 },
      { temperature_C: 400, stress_MPa: 100 },
      { temperature_C: 450, stress_MPa: 66 },
      { temperature_C: 500, stress_MPa: 36 },
      { temperature_C: 538, stress_MPa: 14 }
    ]
  },
  {
    designation: 'SA-106 Gr.C',
    specNumber: 'SA-106',
    grade: 'C',
    type: 'pipe',
    productForm: 'Seamless carbon steel pipe for high-temp service',
    UNSnumber: 'K03501',
    PNumber: 1,
    groupNumber: 2,
    yieldStrength_MPa: 275,
    tensileStrength_MPa: 485,
    maxDesignTemp_C: 538,
    minTempTestExempt_C: -29,
    externalPressureChart: 'CS-2',
    density_kg_m3: 7850,
    notes: ['Higher strength than Gr.B'],
    allowableStressTable: [
      { temperature_C: -30, stress_MPa: 162 },
      { temperature_C: 100, stress_MPa: 162 },
      { temperature_C: 200, stress_MPa: 162 },
      { temperature_C: 300, stress_MPa: 154 },
      { temperature_C: 350, stress_MPa: 143 },
      { temperature_C: 400, stress_MPa: 117 },
      { temperature_C: 450, stress_MPa: 94 },
      { temperature_C: 500, stress_MPa: 70 },
      { temperature_C: 538, stress_MPa: 49 }
    ]
  },
  {
    designation: 'SA-312 TP316L',
    specNumber: 'SA-312',
    grade: '316L',
    type: 'pipe',
    productForm: 'Seamless/welded austenitic stainless steel pipe',
    UNSnumber: 'S31603',
    PNumber: 8,
    groupNumber: 1,
    yieldStrength_MPa: 170,
    tensileStrength_MPa: 485,
    maxDesignTemp_C: 816,
    minTempTestExempt_C: -196,
    externalPressureChart: 'HA-4',
    density_kg_m3: 8000,
    notes: ['SS pipe, matches 316L plate'],
    allowableStressTable: [
      { temperature_C: -196, stress_MPa: 115 },
      { temperature_C: 100, stress_MPa: 115 },
      { temperature_C: 200, stress_MPa: 102 },
      { temperature_C: 300, stress_MPa: 90 },
      { temperature_C: 400, stress_MPa: 80 },
      { temperature_C: 500, stress_MPa: 71 },
      { temperature_C: 600, stress_MPa: 61 },
      { temperature_C: 650, stress_MPa: 56 },
      { temperature_C: 700, stress_MPa: 45 },
      { temperature_C: 750, stress_MPa: 31 },
      { temperature_C: 800, stress_MPa: 21 },
      { temperature_C: 816, stress_MPa: 17 }
    ]
  },
  {
    designation: 'SA-193 B7',
    specNumber: 'SA-193',
    grade: 'B7',
    type: 'bolt',
    productForm: 'Alloy steel bolt for high-temp service',
    UNSnumber: 'G41400',
    PNumber: 0,
    yieldStrength_MPa: 720,
    tensileStrength_MPa: 862,
    maxDesignTemp_C: 427,
    minTempTestExempt_C: -29,
    externalPressureChart: '',
    density_kg_m3: 7850,
    notes: ['Most common PV bolt material', 'Chrome-moly alloy'],
    allowableStressTable: [
      { temperature_C: -30, stress_MPa: 172 },
      { temperature_C: 100, stress_MPa: 172 },
      { temperature_C: 200, stress_MPa: 172 },
      { temperature_C: 300, stress_MPa: 169 },
      { temperature_C: 350, stress_MPa: 166 },
      { temperature_C: 400, stress_MPa: 158 },
      { temperature_C: 427, stress_MPa: 150 }
    ]
  },
  {
    designation: 'SA-182 F316',
    specNumber: 'SA-182',
    grade: 'F316',
    type: 'forging',
    productForm: 'Austenitic stainless steel forging',
    UNSnumber: 'S31600',
    PNumber: 8,
    groupNumber: 1,
    yieldStrength_MPa: 205,
    tensileStrength_MPa: 515,
    maxDesignTemp_C: 816,
    minTempTestExempt_C: -196,
    externalPressureChart: 'HA-2',
    density_kg_m3: 8000,
    notes: ['SS flanges and fittings'],
    allowableStressTable: [
      { temperature_C: -196, stress_MPa: 130 },
      { temperature_C: 100, stress_MPa: 130 },
      { temperature_C: 200, stress_MPa: 115 },
      { temperature_C: 300, stress_MPa: 101 },
      { temperature_C: 400, stress_MPa: 90 },
      { temperature_C: 500, stress_MPa: 80 },
      { temperature_C: 600, stress_MPa: 70 },
      { temperature_C: 650, stress_MPa: 65 },
      { temperature_C: 700, stress_MPa: 52 },
      { temperature_C: 750, stress_MPa: 35 },
      { temperature_C: 800, stress_MPa: 24 },
      { temperature_C: 816, stress_MPa: 19 }
    ]
  },
  {
    designation: 'SA-350 LF2',
    specNumber: 'SA-350',
    grade: 'LF2',
    type: 'forging',
    productForm: 'Carbon steel forging for low-temp service',
    UNSnumber: 'K03011',
    PNumber: 1,
    groupNumber: 2,
    yieldStrength_MPa: 250,
    tensileStrength_MPa: 450,
    maxDesignTemp_C: 538,
    minTempTestExempt_C: -46,
    externalPressureChart: 'CS-2',
    density_kg_m3: 7850,
    notes: ['Low-temp flanges and fittings'],
    allowableStressTable: [
      { temperature_C: -50, stress_MPa: 150 },
      { temperature_C: 100, stress_MPa: 150 },
      { temperature_C: 200, stress_MPa: 150 },
      { temperature_C: 300, stress_MPa: 143 },
      { temperature_C: 350, stress_MPa: 131 },
      { temperature_C: 400, stress_MPa: 109 },
      { temperature_C: 450, stress_MPa: 72 },
      { temperature_C: 500, stress_MPa: 39 },
      { temperature_C: 538, stress_MPa: 14 }
    ]
  }
];

class MaterialService {
  private static materials: Map<string, ASMEMaterial> = new Map();

  static initialize(): void {
    MATERIAL_DATABASE.forEach(material => {
      this.materials.set(material.designation, material);
    });
  }

  static getAllowableStress(designation: string, temperature_C: number): number {
    const material = this.materials.get(designation);
    if (!material) {
      throw new Error(`Material ${designation} not found in database`);
    }

    const stressTable = material.allowableStressTable;
    const minTemp = stressTable[0].temperature_C;
    const maxTemp = stressTable[stressTable.length - 1].temperature_C;

    if (temperature_C < minTemp || temperature_C > maxTemp) {
      throw new Error(
        `Temperature ${temperature_C}°C outside material range [${minTemp}°C, ${maxTemp}°C]. Extrapolation not permitted per ASME II-D.`
      );
    }

    for (let i = 0; i < stressTable.length - 1; i++) {
      const lower = stressTable[i];
      const upper = stressTable[i + 1];
      if (temperature_C >= lower.temperature_C && temperature_C <= upper.temperature_C) {
        const fraction = (temperature_C - lower.temperature_C) /
                         (upper.temperature_C - lower.temperature_C);
        return lower.stress_MPa + fraction * (upper.stress_MPa - lower.stress_MPa);
      }
    }

    return stressTable[stressTable.length - 1].stress_MPa;
  }

  static getMaterial(designation: string): ASMEMaterial {
    const material = this.materials.get(designation);
    if (!material) {
      throw new Error(`Material ${designation} not found in database`);
    }
    return material;
  }

  static searchMaterials(query: string): ASMEMaterial[] {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.materials.values()).filter(material =>
      material.designation.toLowerCase().includes(lowerQuery) ||
      material.productForm.toLowerCase().includes(lowerQuery) ||
      material.UNSnumber?.toLowerCase().includes(lowerQuery)
    );
  }

  static getAllDesignations(): string[] {
    return Array.from(this.materials.keys()).sort();
  }

  static getMaterialsByPNumber(pNumber: number): ASMEMaterial[] {
    return Array.from(this.materials.values())
      .filter(material => material.PNumber === pNumber);
  }

  static getMaterialsByType(type: ASMEMaterial['type']): ASMEMaterial[] {
    return Array.from(this.materials.values())
      .filter(material => material.type === type);
  }
}

MaterialService.initialize();

export default MaterialService;