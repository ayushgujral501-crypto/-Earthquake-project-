import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Scale,
  MapPin,
  Activity,
  ShieldAlert,
  Flame,
  Layers,
  Building,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  BarChart2
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export const StateComparison = () => {
  const { stateSeismicProfiles, earthquakes, setActiveTab, setSelectedStateRisk } = useApp();

  const [stateA, setStateA] = useState('Gujarat');
  const [stateB, setStateB] = useState('Maharashtra');

  const profileA = stateSeismicProfiles[stateA] || stateSeismicProfiles['Gujarat'];
  const profileB = stateSeismicProfiles[stateB] || stateSeismicProfiles['Maharashtra'];

  // Historical events for each state
  const eventsA = earthquakes.filter(e => e.state.toLowerCase().includes(stateA.toLowerCase()));
  const eventsB = earthquakes.filter(e => e.state.toLowerCase().includes(stateB.toLowerCase()));

  // Numerical risk score index for visualization
  const getRiskNumeric = (risk) => {
    switch (risk) {
      case 'Very High': return 92;
      case 'High': return 75;
      case 'Moderate': return 50;
      default: return 25;
    }
  };

  // Comparative chart metrics
  const comparativeMetrics = [
    {
      metric: 'Max Magnitude (Mw)',
      [stateA]: profileA.maxHistoricalMagnitude * 10,
      [stateB]: profileB.maxHistoricalMagnitude * 10,
      fullMark: 100
    },
    {
      metric: 'Seismic Risk Index',
      [stateA]: getRiskNumeric(profileA.overallRisk),
      [stateB]: getRiskNumeric(profileB.overallRisk),
      fullMark: 100
    },
    {
      metric: 'Active Fault Density',
      [stateA]: Math.min(100, profileA.activeFaults.length * 16),
      [stateB]: Math.min(100, profileB.activeFaults.length * 16),
      fullMark: 100
    },
    {
      metric: 'Recorded Historical Events',
      [stateA]: Math.min(100, profileA.totalRecordedEvents * 1.5),
      [stateB]: Math.min(100, profileB.totalRecordedEvents * 1.5),
      fullMark: 100
    }
  ];

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Scale color="var(--cyan-bright)" size={28} />
            State-by-State Seismic Comparison & Vulnerability
          </h1>
          <p className="page-subtitle">
            Side-by-side comparative analysis of Indian state hazard zonation, maximum historical ruptures, and structural susceptibility
          </p>
        </div>

        {/* State Selectors */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--cyan-bright)', fontWeight: '700' }}>State A:</span>
            <select
              className="form-control"
              style={{ width: 'auto', fontWeight: '700' }}
              value={stateA}
              onChange={(e) => setStateA(e.target.value)}
            >
              {Object.keys(stateSeismicProfiles).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '800' }}>VS</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.82rem', color: '#f59e0b', fontWeight: '700' }}>State B:</span>
            <select
              className="form-control"
              style={{ width: 'auto', fontWeight: '700' }}
              value={stateB}
              onChange={(e) => setStateB(e.target.value)}
            >
              {Object.keys(stateSeismicProfiles).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Scorecards Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {/* State A Banner */}
        <div className="glass-card" style={{
          borderLeft: `5px solid ${profileA.riskCategoryColor}`,
          borderColor: `${profileA.riskCategoryColor}55`,
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(6, 182, 212, 0.08) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff' }}>{stateA}</h2>
            <span style={{
              padding: '3px 12px',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: '800',
              background: `${profileA.riskCategoryColor}25`,
              color: profileA.riskCategoryColor,
              border: `1px solid ${profileA.riskCategoryColor}66`
            }}>
              {profileA.overallRisk} Risk
            </span>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            BIS Zonation: <strong style={{ color: '#fff' }}>{profileA.bisZoneCode}</strong>
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Design Ground Motion: <strong style={{ color: 'var(--cyan-bright)' }}>{profileA.pgaRange}</strong>
          </div>
        </div>

        {/* State B Banner */}
        <div className="glass-card" style={{
          borderLeft: `5px solid ${profileB.riskCategoryColor}`,
          borderColor: `${profileB.riskCategoryColor}55`,
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(245, 158, 11, 0.08) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff' }}>{stateB}</h2>
            <span style={{
              padding: '3px 12px',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: '800',
              background: `${profileB.riskCategoryColor}25`,
              color: profileB.riskCategoryColor,
              border: `1px solid ${profileB.riskCategoryColor}66`
            }}>
              {profileB.overallRisk} Risk
            </span>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            BIS Zonation: <strong style={{ color: '#fff' }}>{profileB.bisZoneCode}</strong>
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Design Ground Motion: <strong style={{ color: '#f59e0b' }}>{profileB.pgaRange}</strong>
          </div>
        </div>
      </div>

      {/* Side-by-Side In-Depth Parameter Comparison Table */}
      <div className="table-container" style={{ marginBottom: '24px' }}>
        <table className="custom-table" style={{ fontSize: '0.84rem' }}>
          <thead>
            <tr>
              <th style={{ width: '22%' }}>Comparative Parameter</th>
              <th style={{ width: '39%', color: 'var(--cyan-bright)' }}>{stateA} Assessment</th>
              <th style={{ width: '39%', color: '#f59e0b' }}>{stateB} Assessment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: '700', color: 'var(--text-secondary)' }}>
                Seismic Hazard Classification
              </td>
              <td>
                <span className="badge-pill" style={{ color: profileA.riskCategoryColor, fontWeight: '700' }}>
                  {profileA.bisZoneCode}
                </span>
              </td>
              <td>
                <span className="badge-pill" style={{ color: profileB.riskCategoryColor, fontWeight: '700' }}>
                  {profileB.bisZoneCode}
                </span>
              </td>
            </tr>

            <tr>
              <td style={{ fontWeight: '700', color: 'var(--text-secondary)' }}>
                Strongest Recorded Earthquake
              </td>
              <td>
                <strong style={{ color: '#fff' }}>{profileA.strongestEvent}</strong>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Max Magnitude: M {profileA.maxHistoricalMagnitude}</div>
              </td>
              <td>
                <strong style={{ color: '#fff' }}>{profileB.strongestEvent}</strong>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Max Magnitude: M {profileB.maxHistoricalMagnitude}</div>
              </td>
            </tr>

            <tr>
              <td style={{ fontWeight: '700', color: 'var(--text-secondary)' }}>
                Historical Frequency & Activity
              </td>
              <td>{profileA.historicalFrequency}</td>
              <td>{profileB.historicalFrequency}</td>
            </tr>

            <tr>
              <td style={{ fontWeight: '700', color: 'var(--text-secondary)' }}>
                Active Geological Fault Lines
              </td>
              <td>
                <ul style={{ paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {profileA.activeFaults.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul style={{ paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {profileB.activeFaults.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </td>
            </tr>

            <tr>
              <td style={{ fontWeight: '700', color: 'var(--text-secondary)' }}>
                Soil Amplification & Liquefaction
              </td>
              <td style={{ lineHeight: 1.5 }}>{profileA.soilAndLiquefaction}</td>
              <td style={{ lineHeight: 1.5 }}>{profileB.soilAndLiquefaction}</td>
            </tr>

            <tr>
              <td style={{ fontWeight: '700', color: 'var(--text-secondary)' }}>
                Infrastructure Vulnerability
              </td>
              <td style={{ lineHeight: 1.5 }}>{profileA.infrastructureVulnerability}</td>
              <td style={{ lineHeight: 1.5 }}>{profileB.infrastructureVulnerability}</td>
            </tr>

            <tr>
              <td style={{ fontWeight: '700', color: 'var(--text-secondary)' }}>
                Tectonic Scientific Rationale
              </td>
              <td style={{ lineHeight: 1.5, fontSize: '0.8rem', color: '#cbd5e1' }}>{profileA.scientificRationale}</td>
              <td style={{ lineHeight: 1.5, fontSize: '0.8rem', color: '#cbd5e1' }}>{profileB.scientificRationale}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Visual Comparative Chart */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>
              Comparative Hazard & Exposure Metrics
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Side-by-side benchmark of historical magnitude, risk tier, fault line density, and catalog frequency
            </p>
          </div>
          <span className="badge-pill">{stateA} vs {stateB}</span>
        </div>

        <div style={{ height: '280px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparativeMetrics} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis dataKey="metric" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38bdf8', borderRadius: '8px', color: '#fff' }} />
              <Legend formatter={(val) => <span style={{ color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '700' }}>{val}</span>} />
              <Bar dataKey={stateA} fill="#06b6d4" name={stateA} radius={[4, 4, 0, 0]} />
              <Bar dataKey={stateB} fill="#f59e0b" name={stateB} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
