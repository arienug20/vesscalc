import { describe, it, expect } from 'vitest';
import { calcNozzleReinforcement } from '@/calculations/vessel/nozzle';
import type { NozzleInput } from '@/types';

describe('Nozzle Reinforcement Calculation (UG-37)', () => {
  it('passes when sufficient shell excess exists', () => {
    const input: NozzleInput = {
      openingDiameter: 50,
      shellRequiredThickness: 5,
      shellNominalThickness: 12,
      nozzleNominalThickness: 6,
      nozzleRequiredThickness: 2,
      corrosionAllowance: 0
    };

    const result = calcNozzleReinforcement(input);

    expect(result.adequacy).toBe('PASS');
    expect(result.excessArea).toBeGreaterThan(0);
    expect(result.padRequired).toBe(false);
  });

  it('fails when insufficient reinforcement available', () => {
    const input: NozzleInput = {
      openingDiameter: 500,
      shellRequiredThickness: 20,
      shellNominalThickness: 21,
      nozzleNominalThickness: 8,
      nozzleRequiredThickness: 6,
      corrosionAllowance: 2
    };

    const result = calcNozzleReinforcement(input);

    expect(result.adequacy).toBe('FAIL');
    expect(result.excessArea).toBeLessThan(0);
  });

  it('recommends pad when fail without pad', () => {
    const input: NozzleInput = {
      openingDiameter: 500,
      shellRequiredThickness: 20,
      shellNominalThickness: 21,
      nozzleNominalThickness: 8,
      nozzleRequiredThickness: 6,
      corrosionAllowance: 2
    };

    const result = calcNozzleReinforcement(input);

    expect(result.padRequired).toBe(true);
  });

  it('calculates area breakdown correctly', () => {
    const input: NozzleInput = {
      openingDiameter: 100,
      shellRequiredThickness: 8,
      shellNominalThickness: 14,
      nozzleNominalThickness: 10,
      nozzleRequiredThickness: 3,
      corrosionAllowance: 0
    };

    const result = calcNozzleReinforcement(input);

    expect(result.areaAvailable.A1).toBeGreaterThanOrEqual(0);
    expect(result.areaAvailable.A2).toBeGreaterThanOrEqual(0);
    expect(result.areaAvailable.A3).toBe(0);
    expect(result.areaAvailable.A4).toBe(0);
  });

  it('calculates pad contribution', () => {
    const input: NozzleInput = {
      openingDiameter: 200,
      shellRequiredThickness: 10,
      shellNominalThickness: 14,
      nozzleNominalThickness: 10,
      nozzleRequiredThickness: 3,
      corrosionAllowance: 0,
      reinforcementPadOD: 350,
      reinforcementPadThickness: 12
    };

    const result = calcNozzleReinforcement(input);

    expect(result.areaAvailable.A3).toBeGreaterThan(0);
  });

  it('calculates weld contribution', () => {
    const input: NozzleInput = {
      openingDiameter: 100,
      shellRequiredThickness: 8,
      shellNominalThickness: 14,
      nozzleNominalThickness: 10,
      nozzleRequiredThickness: 3,
      corrosionAllowance: 0,
      weldLegSize: 8,
      weldCount: 2
    };

    const result = calcNozzleReinforcement(input);

    expect(result.areaAvailable.A4).toBeGreaterThan(0);
  });

  it('calculates limits of reinforcement', () => {
    const input: NozzleInput = {
      openingDiameter: 100,
      shellRequiredThickness: 8,
      shellNominalThickness: 14,
      nozzleNominalThickness: 10,
      nozzleRequiredThickness: 3,
      corrosionAllowance: 0
    };

    const result = calcNozzleReinforcement(input);

    expect(result.limitsOfReinforcement.horizontal).toBeGreaterThan(0);
    expect(result.limitsOfReinforcement.vertical).toBeGreaterThan(0);
  });
});