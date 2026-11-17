import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Activity,
  TrendingUp,
  Layers,
  AlertTriangle,
  ArrowRight,
  Filter,
  BarChart3,
  Sliders
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine
} from 'recharts';

export const StructuralAnalysis = () => {
  const { infrastructure } = useApp();

  const [selectedAssetId, setSelectedAssetId] = useState(infrastructure[0]?.id || '');

  const currentAsset = infrastructure.find(i => i.id === selectedAssetId) || infrastructure[0];

  // Trends data
  const trendData = currentAsset?.historicalTrends || [
    { month: 'Jun 2026', vibration: 2.2, crack: 0.4, deformation: 3.0, health: 78 },
    { month: 'Jul 2026', vibration: 2.5, crack: 0.45, deformation: 3.2, health: 75 },
    { month: 'Aug 2026', vibration: 2.8, crack: 0.5, deformation: 3.5, health: 73 },
    { month: 'Sep 2026', vibration: 2.7, crack: 0.52, deformation: 3.6, health: 72 },
    { month: 'Oct 2026', vibration: 2.6, crack: 0.53, deformation: 3.7, health: 72 },
    { month: 'Nov 2026', vibration: 2.6, crack: 0.53, deformation: 3.7, health: 72 }
  ];

  // Multi-asset comparative data for condition comparison
  const comparativeData = infrastructure.slice(0, 8).map(asset => ({
    name: asset.name.length > 18 ? asset.name.substring(0, 16) + '...' : asset.name,
    health: asset.healthScore,
    risk: asset.riskScore,
    crack: asset.crackMeasurement * 10, // scaled for chart visibility
    vibration: asset.vibrationLevel * 10,
    deformation: asset.structuralDeformation
  }));

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Activity color="var(--cyan-bright)" size={28} />
            Structural Sensor Telemetry & Analytics
          </h1>
          <p className="page-subtitle">
            Historical vibration velocity, fissure displacement, structural deflection, and multi-asset condition comparison
          </p>
        </div>

        {/* Asset Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Selected Structure:</span>
          <select
            className="form-control"
            style={{ width: 'auto', minWidth: '240px' }}
            value={selectedAssetId}
            onChange={(e) => setSelectedAssetId(e.target.value)}
          >
            {infrastructure.map(asset => (
              <option key={asset.id} value={asset.id}>
                {asset.name} ({asset.type} • {asset.riskCategory})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Structure At-A-Glance Bar */}
      {currentAsset && (
        <div className="glass-card" style={{ marginBottom: '24px', padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Audited Structure</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#fff' }}>
                {currentAsset.name}
              </h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {currentAsset.city}, {currentAsset.state} • {currentAsset.subType} • Age: {currentAsset.age} yrs
              </div>
            </div>

            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Vibration</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--cyan-bright)', fontFamily: 'var(--font-mono)' }}>
                  {currentAsset.vibrationLevel} mm/s
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Crack Width</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>
                  {currentAsset.crackMeasurement} mm
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Deflection</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#60a5fa', fontFamily: 'var(--font-mono)' }}>
                  {currentAsset.structuralDeformation} mm
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Health Index</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: currentAsset.healthScore > 65 ? 'var(--risk-healthy)' : currentAsset.healthScore > 40 ? 'var(--risk-moderate)' : 'var(--risk-critical)', fontFamily: 'var(--font-mono)' }}>
                  {currentAsset.healthScore}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Four Core Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
        gap: '24px'
      }}>
        {/* Chart 1: Vibration Trends */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Vibration Trends (6-Month Velocity History)</h3>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Dynamic resonance in mm/s with safe threshold limits</p>
            </div>
            <span className="badge-pill">ISO 10816 Telemetry</span>
          </div>

          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="vibColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.45}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 'auto']} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38bdf8', borderRadius: '8px', color: '#fff' }}
                />
                <ReferenceLine y={4.5} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Warning 4.5 mm/s', fill: '#f59e0b', fontSize: 10 }} />
                <ReferenceLine y={7.0} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Critical 7.0 mm/s', fill: '#ef4444', fontSize: 10 }} />
                <Area type="monotone" dataKey="vibration" stroke="#06b6d4" strokeWidth={2.5} fill="url(#vibColor)" name="Vibration (mm/s)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Crack Measurement History */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Crack Measurement History (Fissure Propagation)</h3>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Fissure opening width in mm via optical micro-extensometers</p>
            </div>
            <span className="badge-pill">Crack Progression</span>
          </div>

          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 'auto']} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38bdf8', borderRadius: '8px', color: '#fff' }}
                />
                <ReferenceLine y={0.3} stroke="#10b981" strokeDasharray="2 2" label={{ value: 'IRC Safe Limit 0.3mm', fill: '#10b981', fontSize: 10 }} />
                <ReferenceLine y={1.5} stroke="#ef4444" strokeDasharray="2 2" label={{ value: 'Severe 1.5mm', fill: '#ef4444', fontSize: 10 }} />
                <Line type="monotone" dataKey="crack" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b' }} name="Crack Width (mm)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Structural Deformation Trends */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Structural Deformation Trends (Deflection Sag)</h3>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Mid-span deflection and vertical displacement in mm</p>
            </div>
            <span className="badge-pill">Span Sag Metric</span>
          </div>

          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="defColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.45}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 'auto']} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38bdf8', borderRadius: '8px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="deformation" stroke="#3b82f6" strokeWidth={2.5} fill="url(#defColor)" name="Deformation (mm)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Historical Condition Comparison Across Fleet */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Historical Condition Comparison (Cross-Asset Benchmark)</h3>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Health score vs cumulative risk across Indian infrastructure</p>
            </div>
            <span className="badge-pill">Fleet Comparison</span>
          </div>

          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparativeData} margin={{ top: 10, right: 10, left: -10, bottom: 35 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} angle={-25} textAnchor="end" interval={0} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38bdf8', borderRadius: '8px', color: '#fff' }}
                />
                <Legend verticalAlign="top" height={36} formatter={(val) => <span style={{ color: '#cbd5e1', fontSize: '0.78rem' }}>{val}</span>} />
                <Bar dataKey="health" fill="#10b981" name="Health Score" radius={[4, 4, 0, 0]} />
                <Bar dataKey="risk" fill="#ef4444" name="Risk Score" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
