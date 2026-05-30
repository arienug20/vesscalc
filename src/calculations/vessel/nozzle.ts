import type { NozzleInput, NozzleResult } from '@/types';

export function calcNozzleReinforcement(input: NozzleInput): NozzleResult {
  const { openingDiameter: d, shellRequiredThickness: tr, shellNominalThickness: tn_shell,
          nozzleNominalThickness: tn, nozzleRequiredThickness: trn, corrosionAllowance: CA,
          fFactor: F = 1.0 } = input;

  const A = d * tr * F;

  const limit_horizontal = Math.max(2 * (tn_shell - CA), tn_shell + tn - CA);
  const limit_vertical = Math.min(2.5 * (tn - CA), 2.5 * tn_shell);

  const A1 = Math.max(0,
    (2 * (tn_shell - CA) - tr) * Math.min(d + 2 * (tn - CA), d + 2 * limit_horizontal / 2)
  );

  const nozzleExcess = tn - CA - trn;
  const A2 = nozzleExcess > 0
    ? 2 * nozzleExcess * Math.min(2.5 * (tn - CA), 2.5 * tn_shell) * (input.fR1 ?? 1.0)
    : 0;

  let A3 = 0;
  if (input.reinforcementPadOD && input.reinforcementPadThickness) {
    const padWidth = input.reinforcementPadOD - d - 2 * tn;
    A3 = padWidth * input.reinforcementPadThickness * (input.fR2 ?? 1.0);
  }

  let A4 = 0;
  if (input.weldLegSize) {
    const weldCount = input.weldCount ?? 2;
    A4 = Math.pow(input.weldLegSize, 2) * weldCount;
  }

  const totalAvailable = A1 + A2 + A3 + A4;
  const excess = totalAvailable - A;

  return {
    areaRequired: parseFloat(A.toFixed(1)),
    areaAvailable: {
      A1: parseFloat(A1.toFixed(1)),
      A2: parseFloat(A2.toFixed(1)),
      A3: parseFloat(A3.toFixed(1)),
      A4: parseFloat(A4.toFixed(1)),
      total: parseFloat(totalAvailable.toFixed(1))
    },
    adequacy: excess >= 0 ? 'PASS' : 'FAIL',
    excessArea: parseFloat(excess.toFixed(1)),
    padRequired: A3 === 0 && excess < 0,
    limitsOfReinforcement: {
      horizontal: parseFloat(limit_horizontal.toFixed(1)),
      vertical: parseFloat(limit_vertical.toFixed(1))
    }
  };
}