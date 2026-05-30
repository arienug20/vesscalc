import { describe, it, expect } from 'vitest';
import { calcCylindricalShellThickness } from '@/calculations/vessel/shell';
import type { ShellInput } from '@/types';

describe('Shell Thickness Calculation (UG-27)', () => {
  it('calculates cylindrical shell thickness for basic case', () => {
    const input: ShellInput = {
      designPressure: 1.0,
      innerRadius: 500,
      allowableStress: 138,
      jointEfficiency: 1.0,
      corrosionAllowance: 0,
      shellType: 'cylindrical'
    };

    const result = calcCylindricalShellThickness(input);

    expect(result.requiredThickness_mm).toBeCloseTo(3.64, 1);
    expect(result.governingStress).toBe('circumferential');
    expect(result.codeLimitCheck.passed).toBe(true);
  });

  it('calculates cylindrical shell thickness with CA', () => {
    const input: ShellInput = {
      designPressure: 1.0,
      innerRadius: 500,
      allowableStress: 138,
      jointEfficiency: 1.0,
      corrosionAllowance: 3,
      shellType: 'cylindrical'
    };

    const result = calcCylindricalShellThickness(input);

    expect(result.thicknessWithCA).toBeCloseTo(6.64, 1);
  });

  it('handles high pressure case', () => {
    const input: ShellInput = {
      designPressure: 10,
      innerRadius: 300,
      allowableStress: 138,
      jointEfficiency: 1.0,
      corrosionAllowance: 0,
      shellType: 'cylindrical'
    };

    const result = calcCylindricalShellThickness(input);

    expect(result.requiredThickness_mm).toBeGreaterThan(20);
  });

  it('calculates spherical shell thickness', () => {
    const input: ShellInput = {
      designPressure: 1.0,
      innerRadius: 500,
      allowableStress: 138,
      jointEfficiency: 1.0,
      corrosionAllowance: 0,
      shellType: 'spherical'
    };

    const result = calcCylindricalShellThickness(input);

    expect(result.requiredThickness_mm).toBeCloseTo(1.81, 1);
  });

  it('checks code limit for cylindrical shell', () => {
    const input: ShellInput = {
      designPressure: 55,
      innerRadius: 500,
      allowableStress: 138,
      jointEfficiency: 1.0,
      corrosionAllowance: 0,
      shellType: 'cylindrical'
    };

    const result = calcCylindricalShellThickness(input);

    expect(result.codeLimitCheck.passed).toBe(false);
  });

  it('checks code limit for spherical shell', () => {
    const input: ShellInput = {
      designPressure: 200,
      innerRadius: 500,
      allowableStress: 138,
      jointEfficiency: 1.0,
      corrosionAllowance: 0,
      shellType: 'spherical'
    };

    const result = calcCylindricalShellThickness(input);

    expect(result.codeLimitCheck.passed).toBe(false);
  });

  it('handles zero pressure', () => {
    const input: ShellInput = {
      designPressure: 0,
      innerRadius: 500,
      allowableStress: 138,
      jointEfficiency: 1.0,
      corrosionAllowance: 0,
      shellType: 'cylindrical'
    };

    const result = calcCylindricalShellThickness(input);

    expect(result.requiredThickness_mm).toBe(0);
  });
});