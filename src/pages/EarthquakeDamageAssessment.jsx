import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateModelDamage } from '../utils/seismicEngine';
import {
  Activity,
  AlertTriangle,
  Building,
  Route,
  GitBranch,
  Users,
  ShieldAlert,
  Sparkles,
  Sliders,
  Flame,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw
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
  Cell
} from 'recharts';

export const EarthquakeDamageAssessment = () => {
  const { earthquakes, stateSeismicProfiles } = useApp();

  const [mode, setMode] = useState('hypothetical'); // 'hypothetical' | 'historical-observed'
  const [selectedHistoricalId, setSelectedHistoricalId] = useState(earthquakes[0]?.id || '');

  // Hypothetical Scenario Parameters
  const [scenario, setScenario] = useState({
    state: 'Gujarat',
    city: 'Bhuj',
    magnitude: 7.2,
    epicentralDistance: 25,
    focalDepth: 15,
    soilType: 'Soft Alluvium',
    densityTier: 'High'
  });

  // Calculate model-based hypothetical damage
  const modelResult = calculateModelDamage(scenario);

  // Selected historical event for observed damage
  const historicalEvent = earthquakes.find(e => e.id === selectedHistoricalId) || earthquakes[0];

  const handleScenarioChange = (e) => {
    const { name, value } = e.target;
    setScenario(prev => ({
      ...prev,
      [name]: name === 'state' || name === 'city' || name === 'soilType' || name === 'densityTier'
        ? value
        : parseFloat(value) || 0
    }));
  };

  // Comparative building damage chart data
  const buildingComparisonData = [
    {
      category: 'Unreinforced Masonry',
      collapse: parseInt(modelResult.buildingDamage.unreinforcedMasonry.collapseRate),
      severe: parseInt(modelResult.buildingDamage.unreinforcedMasonry.severeDamageRate)
    },
    {
      category: 'Pre-Code RC Frames',
      collapse: parseInt(modelResult.buildingDamage.preCodeRC.collapseRate),
      severe: parseInt(modelResult.buildingDamage.preCodeRC.severeDamageRate)
    },
    {
      category: 'Ductile RC (IS 13920)',
      collapse: parseInt(modelResult.buildingDamage.ductileRC.collapseRate),
      severe: parseInt(modelResult.buildingDamage.ductileRC.severeDamageRate)
    }
  ];

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Activity color="var(--cyan-bright)" size={28} />
            Earthquake Damage Assessment Engine
          </h1>
          <p className="page-subtitle">
            Multidimensional structural damage estimation, fragility analysis, and historical post-disaster field benchmarks
          </p>
        </div>

        {/* Mode Switcher */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '3px',
          display: 'flex',
          gap: '2px'
        }}>
          <button
            onClick={() => setMode('hypothetical')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: mode === 'hypothetical' ? 'rgba(6, 182, 212, 0.25)' : 'transparent',
              color: mode === 'hypothetical' ? '#fff' : 'var(--text-muted)',
              fontWeight: mode === 'hypothetical' ? '700' : '500',
              fontSize: '0.78rem',
              cursor: 'pointer'
            }}
          >
            Hypothetical Model Simulation
          </button>
          <button
            onClick={() => setMode('historical-observed')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: mode === 'historical-observed' ? 'rgba(6, 182, 212, 0.25)' : 'transparent',
              color: mode === 'historical-observed' ? '#fff' : 'var(--text-muted)',
              fontWeight: mode === 'historical-observed' ? '700' : '500',
              fontSize: '0.78rem',
              cursor: 'pointer'
            }}
          >
            Historical Observed Damage
          </button>
        </div>
      </div>

      {/* CLARITY NOTICE: HISTORICAL VS HYPOTHETICAL */}
      <div style={{
        padding: '12px 18px',
        borderRadius: '10px',
        background: mode === 'hypothetical' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(245, 158, 11, 0.1)',
        border: mode === 'hypothetical' ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <HelpCircle size={20} color={mode === 'hypothetical' ? 'var(--cyan-bright)' : '#f59e0b'} style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.8rem', color: '#e2e8f0', lineHeight: 1.5 }}>
          {mode === 'hypothetical' ? (
            <span>
              <strong>MODEL-BASED HYPOTHETICAL ESTIMATE:</strong> Displaying engineering fragility projections calculated from Peak Ground Acceleration (PGA) attenuation and standard civil vulnerability curves (HAZUS adapted for Indian building typologies). <em>This is an engineering risk scenario model, not an observed real-time event.</em>
            </span>
          ) : (
            <span>
              <strong>HISTORICAL OBSERVED DAMAGE RECORD:</strong> Displaying verified post-disaster field survey documentation from official disaster management reports (GSDMA, GSI, NDMA, and USGS).
            </span>
          )}
        </div>
      </div>

      {/* MODE 1: HYPOTHETICAL DAMAGE ASSESSMENT */}
      {mode === 'hypothetical' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px'
        }}>
          {/* Left Column: Scenario Parameters */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sliders size={18} color="var(--cyan-bright)" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>Hypothetical Scenario Controls</h3>
              </div>
              <span className="badge-pill">Fragility Model</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* State & City */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Target State</label>
                  <select
                    name="state"
                    className="form-control"
                    value={scenario.state}
                    onChange={handleScenarioChange}
                  >
                    {Object.keys(stateSeismicProfiles).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">City / District</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={scenario.city}
                    onChange={handleScenarioChange}
                  />
                </div>
              </div>

              {/* Sliders for Magnitude, Distance, Depth */}
              <div style={{
                background: 'rgba(11, 19, 41, 0.6)',
                borderRadius: '10px',
                border: '1px solid var(--border-subtle)',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}>
                {/* Magnitude */}
                <div className="form-group" style={{ margin: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>Earthquake Magnitude (Mw)</span>
                    <strong style={{ color: scenario.magnitude >= 7.0 ? '#ef4444' : '#f59e0b', fontFamily: 'var(--font-mono)' }}>
                      M {scenario.magnitude.toFixed(1)}
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="5.0"
                    max="8.5"
                    step="0.1"
                    name="magnitude"
                    value={scenario.magnitude}
                    onChange={handleScenarioChange}
                    style={{ width: '100%', accentColor: 'var(--cyan-primary)', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    <span>M 5.0 (Moderate)</span>
                    <span>M 7.0 (Major)</span>
                    <span>M 8.5 (Great)</span>
                  </div>
                </div>

                {/* Epicentral Distance */}
                <div className="form-group" style={{ margin: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>Epicentral Distance</span>
                    <strong style={{ color: 'var(--cyan-bright)', fontFamily: 'var(--font-mono)' }}>
                      {scenario.epicentralDistance} km
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="150"
                    step="5"
                    name="epicentralDistance"
                    value={scenario.epicentralDistance}
                    onChange={handleScenarioChange}
                    style={{ width: '100%', accentColor: 'var(--cyan-primary)', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    <span>5 km (Near Field)</span>
                    <span>75 km</span>
                    <span>150 km (Far Field)</span>
                  </div>
                </div>

                {/* Focal Depth */}
                <div className="form-group" style={{ margin: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>Focal Depth</span>
                    <strong style={{ color: '#fff', fontFamily: 'var(--font-mono)' }}>
                      {scenario.focalDepth} km
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    name="focalDepth"
                    value={scenario.focalDepth}
                    onChange={handleScenarioChange}
                    style={{ width: '100%', accentColor: 'var(--cyan-primary)', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    <span>5 km (Shallow / Severe)</span>
                    <span>30 km (Intermediate)</span>
                    <span>60 km (Deep)</span>
                  </div>
                </div>
              </div>

              {/* Soil Type and Population Density */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Subsurface Soil</label>
                  <select
                    name="soilType"
                    className="form-control"
                    value={scenario.soilType}
                    onChange={handleScenarioChange}
                  >
                    <option value="Soft Alluvium">Soft Alluvium (High Amp)</option>
                    <option value="Medium">Medium Dense Soil</option>
                    <option value="Hard Rock">Hard Bedrock / Basalt</option>
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Urban Density Tier</label>
                  <select
                    name="densityTier"
                    className="form-control"
                    value={scenario.densityTier}
                    onChange={handleScenarioChange}
                  >
                    <option value="Very High (Megacity)">Very High (Megacity)</option>
                    <option value="High">High (Tier-2 City)</option>
                    <option value="Rural / Moderate">Moderate / Rural</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Model Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Intensity & Severity Banner */}
            <div className="glass-card" style={{
              borderLeft: `5px solid ${modelResult.severityColor}`,
              borderColor: `${modelResult.severityColor}44`
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Projected Ground Motion
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginTop: '2px' }}>
                    {scenario.city}, {scenario.state} Scenario
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Estimated Intensity: <strong style={{ color: '#fff' }}>MMI {modelResult.mmi}</strong>
                  </div>
                </div>

                <span style={{
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  background: `${modelResult.severityColor}22`,
                  color: modelResult.severityColor,
                  border: `1px solid ${modelResult.severityColor}55`
                }}>
                  {modelResult.severityTier}
                </span>
              </div>

              {/* PGA Display */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '16px',
                padding: '12px 16px',
                borderRadius: '8px',
                background: 'rgba(11, 19, 41, 0.75)',
                border: '1px solid var(--border-subtle)'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Computed Peak Ground Acceleration (PGA)</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--cyan-bright)', fontFamily: 'var(--font-mono)' }}>
                    {modelResult.pga} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>g</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Estimated Affected Population</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                    {modelResult.populationImpact.estimatedAffectedCount}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Potential Casualties: {modelResult.populationImpact.hypotheticalCasualtyRange}
                  </div>
                </div>
              </div>
            </div>

            {/* Building Vulnerability Breakdown */}
            <div className="glass-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Building size={18} color="var(--cyan-bright)" />
                <h4 style={{ fontSize: '0.96rem', fontWeight: '700' }}>
                  Potential Building Damage Distribution (Fragility Curves)
                </h4>
              </div>

              <div style={{ height: '180px', width: '100%', marginBottom: '14px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={buildingComparisonData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                    <XAxis dataKey="category" stroke="#64748b" fontSize={10} />
                    <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38bdf8', borderRadius: '8px', color: '#fff' }} />
                    <Legend formatter={(val) => <span style={{ color: '#cbd5e1', fontSize: '0.76rem' }}>{val}</span>} />
                    <Bar dataKey="collapse" fill="#ef4444" name="% Complete Collapse" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="severe" fill="#f59e0b" name="% Moderate / Severe Fissures" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem' }}>
                <div style={{ background: 'rgba(11, 19, 41, 0.5)', padding: '8px 10px', borderRadius: '6px' }}>
                  <strong style={{ color: '#f87171' }}>Non-Engineered Masonry: </strong>
                  {modelResult.buildingDamage.unreinforcedMasonry.collapseRate} collapse rate. {modelResult.buildingDamage.unreinforcedMasonry.performance}.
                </div>
                <div style={{ background: 'rgba(11, 19, 41, 0.5)', padding: '8px 10px', borderRadius: '6px' }}>
                  <strong style={{ color: '#fbbf24' }}>Pre-Code RC: </strong>
                  {modelResult.buildingDamage.preCodeRC.collapseRate} collapse rate. {modelResult.buildingDamage.preCodeRC.performance}.
                </div>
                <div style={{ background: 'rgba(11, 19, 41, 0.5)', padding: '8px 10px', borderRadius: '6px' }}>
                  <strong style={{ color: '#34d399' }}>Ductile RC (IS 13920): </strong>
                  {modelResult.buildingDamage.ductileRC.collapseRate} collapse rate. {modelResult.buildingDamage.ductileRC.performance}.
                </div>
              </div>
            </div>

            {/* Roads & Bridges Impact */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {/* Roads */}
              <div className="glass-card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '0.86rem', color: '#fb923c', marginBottom: '8px' }}>
                  <Route size={16} />
                  <span>Road & Highway Fragility</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>Pavement Fissures: <strong>{modelResult.roadDamage.surfaceFissureRisk}</strong></div>
                  <div>Landslide Blockage: <strong>{modelResult.roadDamage.landslideBlockageRisk}</strong></div>
                  <div>Culvert Failures: <strong>{modelResult.roadDamage.culvertFailureRisk}</strong></div>
                  <div style={{ marginTop: '4px', color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                    {modelResult.roadDamage.recommendation}
                  </div>
                </div>
              </div>

              {/* Bridges */}
              <div className="glass-card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '0.86rem', color: 'var(--cyan-bright)', marginBottom: '8px' }}>
                  <GitBranch size={16} />
                  <span>Bridge & Viaduct Fragility</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>Bearing Displacement: <strong>{modelResult.bridgeDamage.bearingDisplacementRisk}</strong></div>
                  <div>Pier Shear Cracks: <strong>{modelResult.bridgeDamage.pierShearRisk}</strong></div>
                  <div>Approach Settlement: <strong>{modelResult.bridgeDamage.approachSettlementRisk}</strong></div>
                  <div style={{ marginTop: '4px', color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                    {modelResult.bridgeDamage.recommendation}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: HISTORICAL OBSERVED DAMAGE */}
      {mode === 'historical-observed' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Historical Event Selector */}
          <div className="glass-card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Select Historical Indian Earthquake Event:</h3>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Review verified post-disaster field inspection data</p>
              </div>

              <select
                className="form-control"
                style={{ width: 'auto', minWidth: '300px', fontWeight: '700' }}
                value={selectedHistoricalId}
                onChange={(e) => setSelectedHistoricalId(e.target.value)}
              >
                {earthquakes.map(eq => (
                  <option key={eq.id} value={eq.id}>
                    {eq.year} — {eq.name} (M {eq.magnitude} • {eq.state})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Detailed Observed Field Report */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Verified Historical Reconnaissance Report
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginTop: '2px' }}>
                  {historicalEvent.name} ({historicalEvent.year})
                </h2>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Epicenter: <strong>{historicalEvent.epicenter}</strong> • Date: <strong>{historicalEvent.date} ({historicalEvent.time})</strong>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{
                  padding: '4px 14px',
                  borderRadius: '6px',
                  fontWeight: '900',
                  fontSize: '1.1rem',
                  background: 'rgba(239, 68, 68, 0.2)',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  Magnitude {historicalEvent.magnitude} {historicalEvent.magnitudeType}
                </span>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  Focal Depth: <strong>{historicalEvent.depth} km</strong> | Intensity: <strong>{historicalEvent.intensity}</strong>
                </div>
              </div>
            </div>

            {/* Observed Casualties & Loss Bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              background: 'rgba(11, 19, 41, 0.7)',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Verified Fatalities</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#ef4444', fontFamily: 'var(--font-mono)' }}>
                  {historicalEvent.casualties?.fatalities ? historicalEvent.casualties.fatalities.toLocaleString('en-IN') : 'N/A'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Injured Persons</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>
                  {historicalEvent.casualties?.injured ? historicalEvent.casualties.injured.toLocaleString('en-IN') : 'N/A'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Left Homeless</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                  {historicalEvent.casualties?.homeless ? historicalEvent.casualties.homeless.toLocaleString('en-IN') : 'N/A'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Reported Economic Loss</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--cyan-bright)' }}>
                  {historicalEvent.estimatedEconomicLoss}
                </div>
              </div>
            </div>

            {/* Observed Structural Field Analysis */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '0.86rem', color: '#f87171', marginBottom: '8px' }}>
                  <Building size={16} />
                  <span>Observed Building Structural Failures</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                  {historicalEvent.infrastructureDamage?.buildings}
                </p>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '0.86rem', color: '#fb923c', marginBottom: '8px' }}>
                  <Route size={16} />
                  <span>Observed Highway & Ground Damage</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                  {historicalEvent.infrastructureDamage?.roads}
                </p>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '0.86rem', color: 'var(--cyan-bright)', marginBottom: '8px' }}>
                  <GitBranch size={16} />
                  <span>Observed Bridge & River Span Damage</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                  {historicalEvent.infrastructureDamage?.bridges}
                </p>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '0.86rem', color: '#cbd5e1', marginBottom: '8px' }}>
                  <ShieldAlert size={16} />
                  <span>Observed Utilities & Heritage Impact</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                  {historicalEvent.infrastructureDamage?.other}
                </p>
              </div>
            </div>

            {/* Official Source & Verification Seal */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              borderTop: '1px solid var(--border-subtle)',
              marginTop: '20px',
              paddingTop: '14px',
              fontSize: '0.76rem',
              color: 'var(--text-muted)'
            }}>
              <div>
                <span>Documented Tectonic Mechanism: </span>
                <strong style={{ color: '#fff' }}>{historicalEvent.faultZone}</strong>
              </div>
              <div>
                <span>Official Archival Source: </span>
                <strong style={{ color: 'var(--cyan-bright)' }}>{historicalEvent.source}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
