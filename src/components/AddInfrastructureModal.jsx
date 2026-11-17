import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateRiskScore } from '../utils/riskEngine';
import { X, Plus, ShieldAlert, Sparkles, MapPin } from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jammu & Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export const AddInfrastructureModal = () => {
  const { isAddModalOpen, setIsAddModalOpen, addInfrastructure } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    type: 'Bridge',
    subType: 'Cable-Stayed Bridge',
    state: 'Maharashtra',
    city: '',
    lat: '19.0760',
    lng: '72.8777',
    age: 10,
    crackMeasurement: 0.45,
    vibrationLevel: 2.5,
    structuralDeformation: 3.2,
    moistureLevel: 45,
    trafficVolume: 'High (80,000 PCU/day)',
    inspectionOfficer: 'Er. R. K. Sharma (Structural Assessor)',
    defectsText: 'Minor hairline surface cracks observed during thermal peak.'
  });

  if (!isAddModalOpen) return null;

  // Real-time risk preview
  const riskPreview = calculateRiskScore({
    type: formData.type,
    age: formData.age,
    crackMeasurement: formData.crackMeasurement,
    vibrationLevel: formData.vibrationLevel,
    structuralDeformation: formData.structuralDeformation,
    moistureLevel: formData.moistureLevel
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter an infrastructure asset name.');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      type: formData.type,
      subType: formData.subType || `${formData.type} Structure`,
      state: formData.state,
      city: formData.city || 'District Center',
      coordinates: [parseFloat(formData.lat) || 20.5937, parseFloat(formData.lng) || 78.9629],
      age: Number(formData.age) || 1,
      crackMeasurement: Number(formData.crackMeasurement) || 0.1,
      vibrationLevel: Number(formData.vibrationLevel) || 1.0,
      structuralDeformation: Number(formData.structuralDeformation) || 1.0,
      moistureLevel: Number(formData.moistureLevel) || 20,
      trafficVolume: formData.trafficVolume,
      inspectionOfficer: formData.inspectionOfficer,
      keyDefects: formData.defectsText ? formData.defectsText.split('\n').filter(Boolean) : ['Initial registration baseline.']
    };

    addInfrastructure(payload);
    setIsAddModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
              <Plus size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Add Infrastructure Asset</h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Register civil asset with baseline IoT sensor readings and Indian state coordinates
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddModalOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Real-time AI Risk Evaluation Banner */}
            <div style={{
              padding: '14px 18px',
              borderRadius: '10px',
              background: 'rgba(11, 19, 41, 0.85)',
              border: `1px solid ${riskPreview.categoryColor}55`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Sparkles size={22} color={riskPreview.categoryColor} />
                <div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Calculated Baseline Risk
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: riskPreview.categoryColor }}>
                    {riskPreview.riskCategory} ({riskPreview.riskScore}/100)
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Rule-Based Engine Active
              </div>
            </div>

            {/* Basic Info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Asset Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Godavari Arch Bridge"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Infrastructure Type</label>
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
                <label className="form-label">Sub-classification</label>
                <input
                  type="text"
                  name="subType"
                  placeholder="e.g., Bowstring Steel Girder"
                  className="form-control"
                  value={formData.subType}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Geographical details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">State (India)</label>
                <select
                  name="state"
                  className="form-control"
                  value={formData.state}
                  onChange={handleChange}
                >
                  {INDIAN_STATES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">City / District</label>
                <input
                  type="text"
                  name="city"
                  placeholder="e.g., Rajahmundry"
                  className="form-control"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Latitude (°N)</label>
                <input
                  type="number"
                  step="0.0001"
                  name="lat"
                  className="form-control"
                  value={formData.lat}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Longitude (°E)</label>
                <input
                  type="number"
                  step="0.0001"
                  name="lng"
                  className="form-control"
                  value={formData.lng}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Sensor & Health Metrics */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--cyan-bright)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Baseline Sensor Measurements
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">
                    <span>Age (Years)</span>
                    <span style={{ color: 'var(--cyan-bright)' }}>{formData.age} y</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="150"
                    name="age"
                    className="form-control"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">
                    <span>Crack Width</span>
                    <span style={{ color: 'var(--cyan-bright)' }}>{formData.crackMeasurement} mm</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="15"
                    name="crackMeasurement"
                    className="form-control"
                    value={formData.crackMeasurement}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">
                    <span>Vibration</span>
                    <span style={{ color: 'var(--cyan-bright)' }}>{formData.vibrationLevel} mm/s</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="20"
                    name="vibrationLevel"
                    className="form-control"
                    value={formData.vibrationLevel}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">
                    <span>Deformation</span>
                    <span style={{ color: 'var(--cyan-bright)' }}>{formData.structuralDeformation} mm</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="40"
                    name="structuralDeformation"
                    className="form-control"
                    value={formData.structuralDeformation}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">
                    <span>Moisture</span>
                    <span style={{ color: 'var(--cyan-bright)' }}>{formData.moistureLevel}%</span>
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    name="moistureLevel"
                    className="form-control"
                    value={formData.moistureLevel}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Inspector and Notes */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Traffic Volume / Load</label>
                <input
                  type="text"
                  name="trafficVolume"
                  className="form-control"
                  value={formData.trafficVolume}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Certified Inspector</label>
                <input
                  type="text"
                  name="inspectionOfficer"
                  className="form-control"
                  value={formData.inspectionOfficer}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Key Structural Defects / Initial Notes</label>
              <textarea
                name="defectsText"
                rows="2"
                className="form-control"
                value={formData.defectsText}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              <Plus size={16} />
              Register Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
