import type { ShellInput, ShellResult } from '@/types';

export function calcCylindricalShellThickness(input: ShellInput): ShellResult {
  const { designPressure: P, innerRadius: R, allowableStress: S,
          jointEfficiency: E, corrosionAllowance: CA, shellType } = input;

  if (shellType === 'spherical') {
    return calcSphericalThickness(input);
  }

  const t_circ = (P * R) / (S * E - 0.6 * P);
  const P_limit_circ = 0.385 * S * E;

  const t_long = (P * R) / (2 * S * E + 0.4 * P);

  const t_required = Math.max(t_circ, t_long);
  const governingStress = t_circ >= t_long ? 'circumferential' : 'longitudinal';

  const codeLimitPassed = P <= P_limit_circ;

  return {
    requiredThickness_mm: parseFloat(t_required.toFixed(2)),
    governingStress: governingStress as 'circumferential' | 'longitudinal',
    codeLimitCheck: {
      passed: codeLimitPassed,
      message: codeLimitPassed
        ? `P=${P.toFixed(3)} MPa ≤ 0.385·S·E = ${P_limit_circ.toFixed(3)} MPa ✓`
        : `P=${P.toFixed(3)} MPa > 0.385·S·E = ${P_limit_circ.toFixed(3)} MPa ✗ — Code limit exceeded!`
    },
    thicknessWithCA: parseFloat((t_required + CA).toFixed(2))
  };
}

function calcSphericalThickness(input: ShellInput): ShellResult {
  const { designPressure: P, innerRadius: R, allowableStress: S,
          jointEfficiency: E, corrosionAllowance: CA } = input;

  const t_required = (P * R) / (2 * S * E - 0.2 * P);
  const P_limit = 1.25 * S * E;
  const codeLimitPassed = P <= P_limit;

  return {
    requiredThickness_mm: parseFloat(t_required.toFixed(2)),
    governingStress: 'circumferential',
    codeLimitCheck: {
      passed: codeLimitPassed,
      message: codeLimitPassed
        ? `P=${P.toFixed(3)} MPa ≤ 1.25·S·E = ${P_limit.toFixed(3)} MPa ✓`
        : `P=${P.toFixed(3)} MPa > 1.25·S·E = ${P_limit.toFixed(3)} MPa ✗`
    },
    thicknessWithCA: parseFloat((t_required + CA).toFixed(2))
  };
}