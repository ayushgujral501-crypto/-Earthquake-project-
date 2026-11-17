import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateRiskScore } from '../utils/riskEngine';
import {
  Cpu,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Save,
  RotateCcw,
  Sliders,
  ShieldCheck,
  Flame,
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

export const AIRiskAnalysis = () => {
  const { infrastructure, saveAssessment, assessments } = useApp();

  const [formData, setFormData] = useState({
    name: 'Chenab Rail Bridge',
    type: 'Bridge',
    age: 2,
    crackMeasurement: 0.15,
    vibrationLevel: 1.5,
    structuralDeformation: 1.8,
    moistureLevel: 30
  });

  const [assessmentResult, setAssessmentResult] = useState(() => {
    return calculateRiskScore({
      type: 'Bridge',
      age: 2,
      crackMeasurement: 0.15,
      vibrationLevel: 1.5,
      structuralDeformation: 1.8,
      moistureLevel: 30
    });
  });

  const [savedNotification, setSavedNotification] = useState(false);

  // Auto-populate from existing assets dropdown
  const handleSelectExisting = (e) => {
    const assetId = e.target.value;
    if (!assetId) return;
    const selected = infrastructure.find(i => i.id === assetId);
    if (selected) {
      const updated = {
        name: selected.name,
        type: selected.type,
        age: selected.age,
        crackMeasurement: selected.crackMeasurement,
        vibrationLevel: selected.vibrationLevel,
        structuralDeformation: selected.structuralDeformation,
        moistureLevel: selected.moistureLevel
      };
      setFormData(updated);
      setAssessmentResult(calculateRiskScore(updated));
      setSavedNotification(false);
    }
  };

  // Preset Scenarios for instant testing
  const loadScenario = (scenario) => {
    let preset = {};
    if (scenario === 'marine_critical') {
      preset = {
        name: 'Simulated Coastal Viaduct (Critical)',
        type: 'Bridge',
        age: 85,
        crackMeasurement: 3.8,
        vibrationLevel: 8.2,
        structuralDeformation: 19.5,
        moistureLevel: 94
      };
    } else if (scenario === 'moderate_expressway') {
      preset = {
        name: 'Simulated Interstate Highway (Moderate)',
        type: 'Road',
        age: 16,
        crackMeasurement: 0.95,
        vibrationLevel: 3.6,
        structuralDeformation: 6.2,
        moistureLevel: 58
      };
    } else {
      preset = {
        name: 'Simulated Smart High-Rise (Healthy)',
        type: 'Building',
        age: 3,
        crackMeasurement: 0.08,
        vibrationLevel: 0.9,
        structuralDeformation: 1.1,
        moistureLevel: 22
      };
    }
    setFormData(preset);
    setAssessmentResult(calculateRiskScore(preset));
    setSavedNotification(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' || name === 'type' ? value : parseFloat(value) || 0
    }));
    setSavedNotification(false);
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    const result = calculateRiskScore(formData);
    setAssessmentResult(result);
    setSavedNotification(false);
  };

  const handleSaveAssessment = () => {
    saveAssessment({
      ...formData,
      result: assessmentResult
    });
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 4000);
  };

  const getBadgeClass = (category) => {
    switch (category) {
      case 'Critical Risk': return 'badge-critical';
      case 'High Risk': return 'badge-high';
      case 'Moderate Risk': return 'badge-moderate';
      default: return 'badge-healthy';
    }
  };

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Cpu color="var(--cyan-bright)" size={28} />
            AI Structural Risk Analysis & Assessment
          </h1>
          <p className="page-subtitle">
            Rule-based algorithmic inference model evaluating multidimensional structural stress telemetry
          </p>
        </div>

        {/* Preset quick test buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => loadScenario('healthy')}
            className="btn btn-secondary btn-sm"
          >
            Healthy Preset
          </button>
          <button
            type="button"
            onClick={() => loadScenario('moderate_expressway')}
            className="btn btn-secondary btn-sm"
          >
            Moderate Preset
          </button>
          <button
            type="button"
            onClick={() => loadScenario('marine_critical')}
            className="btn btn-secondary btn-sm"
            style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171' }}
          >
            Critical Preset
          </button>
        </div>
      </div>

      {/* Academic / Demonstration Model Disclaimer Banner */}
      <div style={{
        padding: '12px 18px',
        borderRadius: '10px',
        background: 'rgba(245, 158, 11, 0.1)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <HelpCircle size={20} color="#f59e0b" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.8rem', color: '#fde68a', lineHeight: 1.5 }}>
          <strong>DEMONSTRATION MODEL NOTICE:</strong> This AI risk scoring tool employs a transparent rule-based civil engineering threshold heuristic (incorporating crack width, vibrational resonance, deformation deflection, asset age, and moisture ingress). It is intended strictly for educational and prototype demonstration purposes, not as a certified professional engineering guarantee.
        </div>
      </div>

      {/* Main Grid: Form Left, Results Right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px'
      }}>
        {/* Left Column: Interactive Form */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} color="var(--cyan-bright)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>Assessment Input Parameters</h3>
            </div>
            <span className="badge-pill">Parametric Inputs</span>
          </div>

          {/* Quick populate from fleet */}
          <div className="form-group">
            <label className="form-label">
              <span>Auto-Populate from Existing Infrastructure:</span>
            </label>
            <select
              className="form-control"
              onChange={handleSelectExisting}
              defaultValue=""
            >
              <option value="">-- Choose asset to test --</option>
              {infrastructure.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.type} • {item.riskCategory})
                </option>
              ))}
            </select>
          </div>

          <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Infrastructure Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Asset Classification</label>
                <select
                  name="type"
                  className="form-control"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="Bridge">Bridge</option>
                  <option value="Road">Road / Expressway</option>
                  <option value="Building">Building / Monument</option>
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">
                  <span>Age (Years)</span>
                  <span style={{ color: 'var(--cyan-bright)' }}>{formData.age} yrs</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="150"
                  name="age"
                  className="form-control"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Slider / Range controls for fine tactile adjustment */}
            <div style={{
              background: 'rgba(11, 19, 41, 0.6)',
              borderRadius: '10px',
              border: '1px solid var(--border-subtle)',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              {/* Crack Measurement */}
              <div className="form-group" style={{ margin: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>Crack Measurement</span>
                  <strong style={{ color: formData.crackMeasurement > 1.5 ? '#ef4444' : 'var(--cyan-bright)', fontFamily: 'var(--font-mono)' }}>
                    {formData.crackMeasurement} mm
                  </strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.05"
                  name="crackMeasurement"
                  value={formData.crackMeasurement}
                  onChange={handleChange}
                  style={{ width: '100%', accentColor: 'var(--cyan-primary)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  <span>0 mm (Hairline)</span>
                  <span>1.0 mm (Moderate)</span>
                  <span>5.0 mm (Fissure)</span>
                </div>
              </div>

              {/* Vibration Level */}
              <div className="form-group" style={{ margin: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>Dynamic Vibration Level</span>
                  <strong style={{ color: formData.vibrationLevel > 5.0 ? '#ef4444' : 'var(--cyan-bright)', fontFamily: 'var(--font-mono)' }}>
                    {formData.vibrationLevel} mm/s
                  </strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.1"
                  name="vibrationLevel"
                  value={formData.vibrationLevel}
                  onChange={handleChange}
                  style={{ width: '100%', accentColor: 'var(--cyan-primary)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  <span>0 mm/s (Static)</span>
                  <span>4.5 mm/s (Alert)</span>
                  <span>12 mm/s (Danger)</span>
                </div>
              </div>

              {/* Structural Deformation */}
              <div className="form-group" style={{ margin: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>Structural Deformation / Sag</span>
                  <strong style={{ color: formData.structuralDeformation > 10 ? '#ef4444' : 'var(--cyan-bright)', fontFamily: 'var(--font-mono)' }}>
                    {formData.structuralDeformation} mm
                  </strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="0.2"
                  name="structuralDeformation"
                  value={formData.structuralDeformation}
                  onChange={handleChange}
                  style={{ width: '100%', accentColor: 'var(--cyan-primary)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  <span>0 mm (Nominal)</span>
                  <span>10 mm (High Deflection)</span>
                  <span>25 mm (Critical)</span>
                </div>
              </div>

              {/* Moisture Level */}
              <div className="form-group" style={{ margin: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>Moisture Level & Humidity Exposure</span>
                  <strong style={{ color: formData.moistureLevel > 70 ? '#ef4444' : 'var(--cyan-bright)', fontFamily: 'var(--font-mono)' }}>
                    {formData.moistureLevel} %
                  </strong>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="1"
                  name="moistureLevel"
                  value={formData.moistureLevel}
                  onChange={handleChange}
                  style={{ width: '100%', accentColor: 'var(--cyan-primary)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  <span>5% (Dry)</span>
                  <span>50% (Standard)</span>
                  <span>100% (Submerged / Marine)</span>
                </div>
              </div>
            </div>

            {/* Analyze Button */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
            >
              <Cpu size={18} />
              <span>Execute AI Risk Analysis</span>
            </button>
          </form>
        </div>

        {/* Right Column: AI Risk Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Main Scorecard Banner */}
          <div className="glass-card" style={{
            borderColor: `${assessmentResult.categoryColor}66`,
            boxShadow: `0 0 25px ${assessmentResult.categoryColor}18`
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                  AI Assessed Classification
                </div>
                <div style={{ fontSize: '1.45rem', fontWeight: '800', color: '#f8fafc', marginTop: '2px' }}>
                  {formData.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {formData.type} Asset • Evaluation Engine v2.4
                </div>
              </div>

              <span className={`badge ${getBadgeClass(assessmentResult.riskCategory)}`} style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                {assessmentResult.riskCategory}
              </span>
            </div>

            {/* Big Score Gauge Display */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: '20px 0',
              padding: '16px 20px',
              borderRadius: '12px',
              background: 'rgba(11, 19, 41, 0.75)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  Calculated Risk Score
                </div>
                <div style={{
                  fontSize: '2.8rem',
                  fontWeight: '900',
                  color: assessmentResult.categoryColor,
                  fontFamily: 'var(--font-mono)',
                  lineHeight: 1.1
                }}>
                  {assessmentResult.riskScore} <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>/ 100</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Protocol: {assessmentResult.actionUrgency}
                </div>
              </div>

              {/* Inverse Health Score */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  Structural Health Index
                </div>
                <div style={{
                  fontSize: '2.4rem',
                  fontWeight: '800',
                  color: assessmentResult.healthScore > 65 ? 'var(--risk-healthy)' : assessmentResult.healthScore > 40 ? 'var(--risk-moderate)' : 'var(--risk-critical)',
                  fontFamily: 'var(--font-mono)',
                  lineHeight: 1.1
                }}>
                  {assessmentResult.healthScore}%
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Span Capacity Integrity
                </div>
              </div>
            </div>

            {/* Score progress bar */}
            <div style={{ width: '100%', height: '8px', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
              <div style={{
                height: '100%',
                width: `${assessmentResult.riskScore}%`,
                background: assessmentResult.categoryColor,
                transition: 'width 0.4s ease'
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <span>0-25: Low</span>
              <span>26-50: Moderate</span>
              <span>51-75: High</span>
              <span>76-100: Critical</span>
            </div>
          </div>

          {/* Natural Language AI Explanation & Recommended Action */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Sparkles size={16} color="var(--cyan-bright)" />
              <h4 style={{ fontSize: '0.92rem', fontWeight: '700' }}>AI Risk Explanation</h4>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '16px' }}>
              {assessmentResult.explanation}
            </p>

            <div style={{
              background: 'rgba(11, 19, 41, 0.7)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '12px 14px'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--cyan-bright)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Engineering Action Required
              </div>
              <p style={{ fontSize: '0.84rem', color: '#f8fafc', lineHeight: 1.4 }}>
                {assessmentResult.recommendedAction}
              </p>
            </div>
          </div>

          {/* Contributing Factors Breakdown */}
          <div className="glass-card">
            <h4 style={{ fontSize: '0.92rem', fontWeight: '700', marginBottom: '14px' }}>
              Contributing Stress Factors Breakdown
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {assessmentResult.contributingFactors.map((factor, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(11, 19, 41, 0.5)',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#f8fafc' }}>
                      {factor.factor}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Input: <strong>{factor.value}</strong> • Safe: {factor.threshold}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', fontFamily: 'var(--font-mono)', color: 'var(--cyan-bright)' }}>
                      +{factor.impact} pts ({factor.weight})
                    </div>
                    <span className="badge-pill" style={{
                      color: factor.status === 'Critical' ? '#ef4444' : factor.status === 'Moderate' ? '#f59e0b' : '#10b981'
                    }}>
                      {factor.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Save to Log Button */}
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {savedNotification ? (
                <span style={{ fontSize: '0.78rem', color: 'var(--risk-healthy)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={14} />
                  Saved to Assessment Audit Log
                </span>
              ) : (
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Total historical assessments saved: {assessments.length}
                </span>
              )}

              <button
                type="button"
                onClick={handleSaveAssessment}
                className="btn btn-outline btn-sm"
              >
                <Save size={14} />
                <span>Save Assessment Record</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
