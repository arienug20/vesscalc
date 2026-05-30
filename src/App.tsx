import { useState } from 'react';
import { Card, Button, Input, Select, Badge } from './components/ui';
import { calcCylindricalShellThickness } from './calculations/vessel/shell';
import { calcHeadThickness } from './calculations/vessel/head';
import MaterialService from './data/materials';
import type { ShellInput, HeadInput, HeadType, ShellResult, HeadResult, NozzleResult } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'vessel' | 'hx'>('vessel');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">VessCalc</h1>
          <p className="text-gray-600 mt-1">Pressure Vessel & Heat Exchanger Quick Sizer</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('vessel')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'vessel'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pressure Vessel
              </button>
              <button
                onClick={() => setActiveTab('hx')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'hx'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Heat Exchanger
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'vessel' ? <VesselCalculator /> : <HeatExchangerCalculator />}
      </main>
    </div>
  );
}

function VesselCalculator() {
  const [designPressure, setDesignPressure] = useState(1.5);
  const [designTemperature, setDesignTemperature] = useState(200);
  const [material, setMaterial] = useState('SA-516 Gr.70');
  const [jointEfficiency, setJointEfficiency] = useState(1.0);
  const [corrosionAllowance, setCorrosionAllowance] = useState(3.0);
  const [innerRadius, setInnerRadius] = useState(600);
  const [headType, setHeadType] = useState<HeadType>('ellipsoidal');
  const [diameter, setDiameter] = useState(1200);

  const [result, setResult] = useState<ShellResult | HeadResult | NozzleResult | null>(null);

  const handleCalculate = () => {
    try {
      const S = MaterialService.getAllowableStress(material, designTemperature);

      const shellInput: ShellInput = {
        designPressure,
        innerRadius,
        allowableStress: S,
        jointEfficiency,
        corrosionAllowance,
        shellType: 'cylindrical'
      };

      const headInput: HeadInput = {
        headType,
        designPressure,
        diameter,
        allowableStress: S,
        jointEfficiency,
        corrosionAllowance
      };

      const shellResult = calcCylindricalShellThickness(shellInput);
      const headResult = calcHeadThickness(headInput);

      setResult({
        shell: shellResult,
        head: headResult,
        allowableStress: S
      });
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Calculation failed');
    }
  };

  const materials = MaterialService.getAllDesignations();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Design Inputs">
        <div className="space-y-4">
          <Input
            label="Design Pressure (MPa)"
            type="number"
            step="0.1"
            value={designPressure}
            onChange={(e) => setDesignPressure(parseFloat(e.target.value))}
          />

          <Input
            label="Design Temperature (°C)"
            type="number"
            step="1"
            value={designTemperature}
            onChange={(e) => setDesignTemperature(parseFloat(e.target.value))}
          />

          <Select
            label="Material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            options={materials.map(m => ({ value: m, label: m }))}
          />

          <Input
            label="Joint Efficiency"
            type="number"
            step="0.05"
            min="0.6"
            max="1.0"
            value={jointEfficiency}
            onChange={(e) => setJointEfficiency(parseFloat(e.target.value))}
          />

          <Input
            label="Corrosion Allowance (mm)"
            type="number"
            step="0.5"
            value={corrosionAllowance}
            onChange={(e) => setCorrosionAllowance(parseFloat(e.target.value))}
          />

          <Input
            label="Inner Radius (mm)"
            type="number"
            step="10"
            value={innerRadius}
            onChange={(e) => setInnerRadius(parseFloat(e.target.value))}
          />

          <Input
            label="Head Diameter (mm)"
            type="number"
            step="10"
            value={diameter}
            onChange={(e) => setDiameter(parseFloat(e.target.value))}
          />

          <Select
            label="Head Type"
            value={headType}
            onChange={(e) => setHeadType(e.target.value as HeadType)}
            options={[
              { value: 'ellipsoidal', label: 'Ellipsoidal 2:1' },
              { value: 'torispherical', label: 'Torispherical' },
              { value: 'hemispherical', label: 'Hemispherical' },
              { value: 'conical', label: 'Conical' },
              { value: 'toriconical', label: 'Toriconical' },
              { value: 'flat', label: 'Flat' }
            ]}
          />

          <Button onClick={handleCalculate} className="w-full">
            Calculate
          </Button>
        </div>
      </Card>

      {result && (
        <Card title="Calculation Results">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Allowable Stress</h4>
              <p className="text-2xl font-bold text-blue-600">
                {result.allowableStress.toFixed(2)} MPa
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Shell Thickness</h4>
              <div className="space-y-2">
                <p>
                  Required: <span className="font-bold">{result.shell.requiredThickness_mm} mm</span>
                </p>
                <p>
                  With CA: <span className="font-bold">{result.shell.thicknessWithCA} mm</span>
                </p>
                <p>
                  Governing: <span className="font-semibold">{result.shell.governingStress}</span>
                </p>
                {result.shell.codeLimitCheck.passed ? (
                  <Badge variant="success">PASS</Badge>
                ) : (
                  <Badge variant="danger">FAIL</Badge>
                )}
                <p className="text-sm text-gray-600">{result.shell.codeLimitCheck.message}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Head Thickness</h4>
              <div className="space-y-2">
                <p>
                  Type: <span className="font-semibold">{result.head.codeReference}</span>
                </p>
                <p>
                  Required: <span className="font-bold">{result.head.requiredThickness_mm} mm</span>
                </p>
                <p>
                  With CA: <span className="font-bold">{result.head.thicknessWithCA} mm</span>
                </p>
                <p>
                  Inside Depth: <span className="font-semibold">{result.head.headInsideDepth} mm</span>
                </p>
                <p>
                  Surface Area: <span className="font-semibold">{result.head.headSurfaceArea} m²</span>
                </p>
                <p>
                  Volume: <span className="font-semibold">{result.head.headVolume} liters</span>
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

function HeatExchangerCalculator() {
  return (
    <Card title="Heat Exchanger Calculator">
      <p className="text-gray-600">
        Heat exchanger thermal design coming soon...
      </p>
    </Card>
  );
}

export default App;