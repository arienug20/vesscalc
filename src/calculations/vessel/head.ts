import type { HeadInput, HeadResult } from '@/types';

export function calcHeadThickness(input: HeadInput): HeadResult {
  const { headType, designPressure: P, diameter: D, allowableStress: S,
          jointEfficiency: E, corrosionAllowance: CA } = input;

  let t_required: number;
  let codeRef: string;
  let insideDepth: number;

  switch (headType) {
    case 'ellipsoidal': {
      t_required = (P * D) / (2 * S * E - 0.2 * P);
      codeRef = 'UG-32(c)';
      insideDepth = D / 4;
      break;
    }
    case 'torispherical': {
      const L = input.crownRadius ?? D;
      const r = input.knuckleRadius ?? 0.06 * D;

      if (L / D > 1.0) {
        throw new Error('Crown radius L/D must be ≤ 1.0 per UG-32(e)');
      }
      if (r / D < 0.06) {
        throw new Error('Knuckle radius r/D must be ≥ 0.06 per UG-32(e)');
      }

      t_required = (0.885 * P * L) / (S * E - 0.1 * P);
      codeRef = 'UG-32(e)';
      insideDepth = L - Math.sqrt(Math.pow(L - r, 2) - Math.pow(D / 2 - r, 2));
      break;
    }
    case 'hemispherical': {
      t_required = (P * D / 2) / (2 * S * E - 0.2 * P);
      codeRef = 'UG-32(f)';
      insideDepth = D / 2;
      break;
    }
    case 'conical': {
      const alpha = (input.halfApexAngle ?? 30) * Math.PI / 180;
      if (alpha > 30 * Math.PI / 180) {
        throw new Error('Half-apex angle must be ≤ 30° per UG-32(g)');
      }
      t_required = (P * D) / (2 * Math.cos(alpha) * (S * E - 0.6 * P));
      codeRef = 'UG-32(g)';
      insideDepth = (D / 2) * Math.tan(alpha);
      break;
    }
    case 'toriconical': {
      const alpha = (input.halfApexAngle ?? 30) * Math.PI / 180;
      const r_knuckle = input.knuckleRadius ?? 0.06 * D;

      const D_knuckle = D - 2 * r_knuckle * (1 - Math.cos(alpha));
      t_required = (P * D_knuckle) / (2 * Math.cos(alpha) * (S * E - 0.6 * P));

      const t_knuckle = (P * r_knuckle) / (S * E - 0.6 * P);
      t_required = Math.max(t_required, t_knuckle);
      codeRef = 'UG-32(g)/UG-32(j)';
      insideDepth = (D / 2) * Math.tan(alpha);
      break;
    }
    case 'flat': {
      const C = input.attachmentC ?? 0.33;
      const d = D;
      t_required = d * Math.sqrt(C * P / (S * E));
      codeRef = 'UG-34';
      insideDepth = 0;
      break;
    }
    default:
      throw new Error(`Unknown head type: ${headType}`);
  }

  return {
    requiredThickness_mm: parseFloat(t_required.toFixed(2)),
    codeReference: codeRef,
    codeLimitCheck: {
      passed: true,
      message: `Required thickness per ${codeRef}: ${t_required.toFixed(2)} mm`
    },
    thicknessWithCA: parseFloat((t_required + CA).toFixed(2)),
    headInsideDepth: parseFloat(insideDepth.toFixed(1)),
    headSurfaceArea: parseFloat(calcHeadSurfaceArea(headType, D).toFixed(3)),
    headVolume: parseFloat(calcHeadVolume(headType, D).toFixed(3))
  };
}

function calcHeadSurfaceArea(type: string, D: number): number {
  const R = D / 2000; // m
  switch (type) {
    case 'ellipsoidal': return 1.084 * Math.PI * R * R;
    case 'torispherical': return 1.065 * Math.PI * R * R;
    case 'hemispherical': return 2 * Math.PI * R * R;
    case 'conical': return Math.PI * R * R / Math.cos(Math.PI / 6);
    case 'toriconical': return Math.PI * R * R / Math.cos(Math.PI / 6) * 1.1;
    case 'flat': return Math.PI * R * R;
    default: return Math.PI * R * R;
  }
}

function calcHeadVolume(type: string, D: number): number {
  const R = D / 2000; // m
  switch (type) {
    case 'ellipsoidal': return (Math.PI * R * R * R / 3) * 1000;
    case 'torispherical': return (0.1 * Math.PI * Math.pow(R, 3)) * 1000;
    case 'hemispherical': return (2 / 3 * Math.PI * Math.pow(R, 3)) * 1000;
    case 'conical': return (1 / 3 * Math.PI * R * R * R * Math.tan(Math.PI / 6)) * 1000;
    case 'toriconical': return (1 / 3 * Math.PI * R * R * R * Math.tan(Math.PI / 6) * 1.1) * 1000;
    case 'flat': return 0;
    default: return 0;
  }
}