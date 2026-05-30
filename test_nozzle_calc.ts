import { calcNozzleReinforcement } from './src/calculations/vessel/nozzle';
import type { NozzleInput } from './src/types';

// Test fail case
const failInput: NozzleInput = {
  openingDiameter: 300,
  shellRequiredThickness: 12,
  shellNominalThickness: 13,
  nozzleNominalThickness: 8,
  nozzleRequiredThickness: 5,
  corrosionAllowance: 0
};

console.log('FAIL TEST CASE:');
const failResult = calcNozzleReinforcement(failInput);
console.log('Result:', JSON.stringify(failResult, null, 2));
console.log('');

// Test pass case  
const passInput: NozzleInput = {
  openingDiameter: 50,
  shellRequiredThickness: 5,
  shellNominalThickness: 12,
  nozzleNominalThickness: 6,
  nozzleRequiredThickness: 2,
  corrosionAllowance: 0
};

console.log('PASS TEST CASE:');
const passResult = calcNozzleReinforcement(passInput);
console.log('Result:', JSON.stringify(passResult, null, 2));
