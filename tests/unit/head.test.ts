import { describe, it, expect } from 'vitest';
import { calcHeadThickness } from '@/calculations/vessel/head';
import type { HeadInput } from '@/types';

describe('Head Thickness Calculation (UG-32)', () => {
  describe('Ellipsoidal Head', () => {
    it('calculates standard 2:1 ellipsoidal head thickness', () => {
      const input: HeadInput = {
        headType: 'ellipsoidal',
        designPressure: 1.0,
        diameter: 1000,
        allowableStress: 138,
        jointEfficiency: 1.0,
        corrosionAllowance: 0
      };

      const result = calcHeadThickness(input);

      expect(result.requiredThickness_mm).toBeCloseTo(3.64, 1);
      expect(result.codeReference).toBe('UG-32(c)');
      expect(result.headInsideDepth).toBeCloseTo(250, 1);
    });

    it('calculates ellipsoidal head with CA', () => {
      const input: HeadInput = {
        headType: 'ellipsoidal',
        designPressure: 1.0,
        diameter: 1000,
        allowableStress: 138,
        jointEfficiency: 1.0,
        corrosionAllowance: 3
      };

      const result = calcHeadThickness(input);

      expect(result.thicknessWithCA).toBeCloseTo(6.64, 1);
    });
  });

  describe('Torispherical Head', () => {
    it('calculates standard torispherical head thickness', () => {
      const input: HeadInput = {
        headType: 'torispherical',
        designPressure: 1.0,
        diameter: 1000,
        allowableStress: 138,
        jointEfficiency: 1.0,
        corrosionAllowance: 0
      };

      const result = calcHeadThickness(input);

      expect(result.codeReference).toBe('UG-32(e)');
      expect(result.requiredThickness_mm).toBeGreaterThan(0);
    });

    it('throws error when L/D > 1.0', () => {
      const input: HeadInput = {
        headType: 'torispherical',
        designPressure: 1.0,
        diameter: 1000,
        allowableStress: 138,
        jointEfficiency: 1.0,
        corrosionAllowance: 0,
        crownRadius: 1200
      };

      expect(() => calcHeadThickness(input)).toThrow('Crown radius L/D must be ≤ 1.0');
    });

    it('throws error when r/D < 0.06', () => {
      const input: HeadInput = {
        headType: 'torispherical',
        designPressure: 1.0,
        diameter: 1000,
        allowableStress: 138,
        jointEfficiency: 1.0,
        corrosionAllowance: 0,
        knuckleRadius: 50
      };

      expect(() => calcHeadThickness(input)).toThrow('Knuckle radius r/D must be ≥ 0.06');
    });
  });

  describe('Hemispherical Head', () => {
    it('calculates hemispherical head thickness', () => {
      const input: HeadInput = {
        headType: 'hemispherical',
        designPressure: 1.0,
        diameter: 1000,
        allowableStress: 138,
        jointEfficiency: 1.0,
        corrosionAllowance: 0
      };

      const result = calcHeadThickness(input);

      expect(result.codeReference).toBe('UG-32(f)');
      expect(result.requiredThickness_mm).toBeCloseTo(1.81, 1);
      expect(result.headInsideDepth).toBeCloseTo(500, 1);
    });
  });

  describe('Conical Head', () => {
    it('calculates conical head thickness', () => {
      const input: HeadInput = {
        headType: 'conical',
        designPressure: 1.0,
        diameter: 1000,
        allowableStress: 138,
        jointEfficiency: 1.0,
        corrosionAllowance: 0,
        halfApexAngle: 30
      };

      const result = calcHeadThickness(input);

      expect(result.codeReference).toBe('UG-32(g)');
      expect(result.requiredThickness_mm).toBeCloseTo(4.20, 1);
    });

    it('throws error when half-apex angle > 30°', () => {
      const input: HeadInput = {
        headType: 'conical',
        designPressure: 1.0,
        diameter: 1000,
        allowableStress: 138,
        jointEfficiency: 1.0,
        corrosionAllowance: 0,
        halfApexAngle: 45
      };

      expect(() => calcHeadThickness(input)).toThrow('Half-apex angle must be ≤ 30°');
    });
  });

  describe('Flat Head', () => {
    it('calculates flat head thickness', () => {
      const input: HeadInput = {
        headType: 'flat',
        designPressure: 1.0,
        diameter: 500,
        allowableStress: 138,
        jointEfficiency: 1.0,
        corrosionAllowance: 0,
        attachmentC: 0.33
      };

      const result = calcHeadThickness(input);

      expect(result.codeReference).toBe('UG-34');
      expect(result.requiredThickness_mm).toBeCloseTo(24.45, 2);
      expect(result.headInsideDepth).toBe(0);
    });
  });
});