import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateHazardProbabilities, BIS_ZONES } from '../utils/seismicEngine';
import {
  ShieldAlert,
  MapPin,
  Activity,
  Layers,
  HelpCircle,
  AlertTriangle,
  Flame,
  CheckCircle,
  Info,
  Scale,
  Building,
  Route,
  GitBranch,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie
} from 'recharts';

export const EarthquakeRiskAnalysis = () => {
  const {
    stateSeismicProfiles,
    selectedStateRisk,
    setSelectedStateRisk,
    earthquakes,
    setActiveTab
  } = useApp();

  const [magnitudeThreshold, setMagnitudeThreshold] = useState(6.0);
  const [timeHorizon, setTimeHorizon] = useState(50); // Years

  const currentState = stateSeismicProfiles[selectedStateRisk] || stateSeismicProfiles["Gujarat"];

  // Probabilistic hazard calculation
  const hazardProb = calculateHazardProbabilities(selectedStateRisk, magnitudeThreshold, timeHorizon);

  // Historical earthquakes in this selected state
  const stateHistoricalEvents = earthquakes.filter(eq =>
    eq.state.toLowerCase().includes(selectedStateRisk.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <ShieldAlert color="var(--cyan-bright)" size={28} />
            AI & Probabilistic Earthquake Risk Analysis
          </h1>
          <p className="page-subtitle">
            Seismic zonation, tectonic fault dynamics, soil liquefaction hazards, and probabilistic recurrence modeling
          </p>
        </div>

        {/* State Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Select State:</span>
          <select
            className="form-control"
            style={{ minWidth: '220px', width: 'auto', fontWeight: '700' }}
            value={selectedStateRisk}
            onChange={(e) => setSelectedStateRisk(e.target.value)}
          >
            {Object.keys(stateSeismicProfiles).map(s => (
              <option key={s} value={s}>{s} ({stateSeismicProfiles[s].overallRisk} Risk)</option>
            ))}
          </select>
        </div>
      </div>

      {/* SCIENTIFIC INTEGRITY / NO FAKE PREDICTIONS MANDATORY BANNER */}
      <div style={{
        padding: '14px 20px',
        borderRadius: '10px',
        background: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.35)',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px'
      }}>
        <AlertTriangle size={24} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#fca5a5', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Scientific Integrity Notice — No Deterministic Earthquake Predictions
          </div>
          <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, marginTop: '4px' }}>
            Current global seismological science <strong>cannot reliably predict the exact date, time, or epicenter</strong> of future earthquakes. 
            InfraGuard AI strictly utilizes validated <strong>Probabilistic Seismic Hazard Analysis (PSHA)</strong>, 
            <strong> Bureau of Indian Standards (BIS IS 1893:2016)</strong> seismic zoning, historical recurrence rates, and geodetic fault kinematics. 
            All models display statistical return periods and uncertainty margins rather than fabricated short-term alarms.
          </p>
        </div>
      </div>

      {/* State Overview & Overall Risk Banner */}
      <div className="glass-card" style={{
        marginBottom: '24px',
        borderLeft: `5px solid ${currentState.riskCategoryColor}`,
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(11, 28, 59, 0.8) 100%)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
              State Seismic Profile Assessment
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff', marginTop: '2px' }}>
              {currentState.state}
            </h2>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              BIS Seismic Classification: <strong style={{ color: '#f8fafc' }}>{currentState.bisZoneCode}</strong> • PGA Design: <strong style={{ color: 'var(--cyan-bright)' }}>{currentState.pgaRange}</strong>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '999px',
              fontSize: '0.92rem',
              fontWeight: '800',
              background: `${currentState.riskCategoryColor}25`,
              color: currentState.riskCategoryColor,
              border: `1.5px solid ${currentState.riskCategoryColor}66`
            }}>
              {currentState.overallRisk} Earthquake Risk
            </span>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              Max Historical Event: <strong style={{ color: '#fff' }}>{currentState.strongestEvent}</strong>
            </div>
          </div>
        </div>

        {/* Understandable Scientific Explanation */}
        <div style={{
          marginTop: '18px',
          padding: '14px 18px',
          borderRadius: '8px',
          background: 'rgba(11, 19, 41, 0.75)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: '700', color: 'var(--cyan-bright)', textTransform: 'uppercase', marginBottom: '6px' }}>
            <Sparkles size={16} />
            <span>Why {currentState.state} has a {currentState.overallRisk} Risk Rating:</span>
          </div>
          <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            {currentState.scientificRationale}
          </p>
        </div>
      </div>

      {/* 4 Core Pillars Grid: Faults, Soil/Liquefaction, Infrastructure Vulnerability, Historical Frequency */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {/* Pillar 1: Fault Zone Information */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f87171'
            }}>
              <Activity size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Active Fault Zones & Tectonics</h3>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Mapped geological fault line systems</p>
            </div>
          </div>

          <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            {currentState.activeFaults.map((fault, idx) => (
              <li key={idx}>
                <strong style={{ color: '#f8fafc' }}>{fault}</strong>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '14px', fontSize: '0.76rem', color: 'var(--text-muted)', borderTop: '1px dashed var(--border-subtle)', paddingTop: '10px' }}>
            Fault data verified via Geological Survey of India (GSI) Seismotectonic Atlas.
          </div>
        </div>

        {/* Pillar 2: Ground & Soil Risk Factors */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fbbf24'
            }}>
              <Layers size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Ground & Soil Amplification</h3>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Subsurface soil and liquefaction vulnerability</p>
            </div>
          </div>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {currentState.soilAndLiquefaction}
          </p>

          <div style={{ marginTop: '14px', fontSize: '0.76rem', color: 'var(--text-muted)', borderTop: '1px dashed var(--border-subtle)', paddingTop: '10px' }}>
            Key urban hotspots: <strong style={{ color: '#cbd5e1' }}>{currentState.keyCities.join(', ')}</strong>
          </div>
        </div>

        {/* Pillar 3: Infrastructure Vulnerability */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(6, 182, 212, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cyan-bright)'
            }}>
              <Building size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Infrastructure Vulnerability</h3>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Built environment structural susceptibility</p>
            </div>
          </div>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {currentState.infrastructureVulnerability}
          </p>

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button
              onClick={() => setActiveTab('eq-damage')}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.74rem' }}
            >
              Simulate Structural Damage &rarr;
            </button>
          </div>
        </div>

        {/* Pillar 4: Historical Frequency & Records */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#34d399'
            }}>
              <Activity size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Historical Frequency & Activity</h3>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Documented seismic catalog statistics</p>
            </div>
          </div>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '10px' }}>
            {currentState.historicalFrequency}
          </p>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Recorded Significant Events in Catalog: <strong style={{ color: '#fff' }}>{stateHistoricalEvents.length} documented</strong>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button
              onClick={() => {
                setActiveTab('eq-history');
              }}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.74rem' }}
            >
              Browse Historical Catalog &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Probabilistic Seismic Recurrence Model & Statistical Visualization */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scale size={20} color="var(--cyan-bright)" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>
                Statistical Recurrence Model (Poissonian Seismic Hazard)
              </h3>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Gutenberg-Richter ($\log_{10} N = a - bM$) probabilistic occurrence over engineering design timeframes
            </p>
          </div>

          {/* Interactive Parameters */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span>Magnitude Threshold:</span>
              <select
                className="form-control"
                style={{ width: 'auto', padding: '4px 10px', fontSize: '0.78rem' }}
                value={magnitudeThreshold}
                onChange={(e) => setMagnitudeThreshold(parseFloat(e.target.value))}
              >
                <option value={5.5}>M ≥ 5.5 (Moderate Damage)</option>
                <option value={6.0}>M ≥ 6.0 (Strong Shaking)</option>
                <option value={6.5}>M ≥ 6.5 (Major Rupture)</option>
                <option value={7.0}>M ≥ 7.0 (Destructive Event)</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span>Time Horizon:</span>
              <select
                className="form-control"
                style={{ width: 'auto', padding: '4px 10px', fontSize: '0.78rem' }}
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(parseInt(e.target.value))}
              >
                <option value={10}>10 Years</option>
                <option value={25}>25 Years</option>
                <option value={50}>50 Years (Standard Code)</option>
                <option value={100}>100 Years (Critical Structures)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Probability Outputs Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
          background: 'rgba(11, 19, 41, 0.7)',
          padding: '16px',
          borderRadius: '10px',
          border: '1px solid var(--border-subtle)',
          marginBottom: '16px'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Probability of Occurrence
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: hazardProb.probabilityPercent > 50 ? '#ef4444' : '#f59e0b', fontFamily: 'var(--font-mono)' }}>
              {hazardProb.probabilityPercent}%
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              Over next {timeHorizon} years (M ≥ {magnitudeThreshold})
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Statistical Return Period
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--cyan-bright)', fontFamily: 'var(--font-mono)' }}>
              ~{hazardProb.returnPeriodYears} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Years</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              Annual Mean Rate: {hazardProb.annualRate} / yr
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Uncertainty Margin (95% CI)
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#cbd5e1', fontFamily: 'var(--font-mono)' }}>
              {hazardProb.confidenceInterval}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              Statistical variance bounds
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Calibrated Tectonic Zone
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>
              {hazardProb.tectonicZone}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Regional seismicity catalog calibration
            </div>
          </div>
        </div>

        {/* Methodology & Uncertainty Explanation */}
        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.5, background: 'rgba(15, 23, 42, 0.5)', padding: '12px 14px', borderRadius: '8px' }}>
          <div><strong>Model Methodology:</strong> {hazardProb.methodology}</div>
          <div style={{ marginTop: '4px' }}><strong>Uncertainty Statement:</strong> {hazardProb.uncertaintyStatement}</div>
        </div>
      </div>
    </div>
  );
};
