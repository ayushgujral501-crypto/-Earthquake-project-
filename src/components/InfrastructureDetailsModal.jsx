import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  MapPin,
  Calendar,
  UserCheck,
  Activity,
  AlertTriangle,
  Wrench,
  Trash2,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const InfrastructureDetailsModal = () => {
  const {
    selectedInfra,
    setSelectedInfra,
    deleteInfrastructure,
    setActiveTab
  } = useApp();

  if (!selectedInfra) return null;

  const getBadgeClass = (category) => {
    switch (category) {
      case 'Critical Risk': return 'badge-critical';
      case 'High Risk': return 'badge-high';
      case 'Moderate Risk': return 'badge-moderate';
      default: return 'badge-healthy';
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${selectedInfra.name}" from InfraGuard AI?`)) {
      deleteInfrastructure(selectedInfra.id);
      setSelectedInfra(null);
    }
  };

  const handleRunAssessment = () => {
    setSelectedInfra(null);
    setActiveTab('ai-risk');
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedInfra(null)}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '820px' }}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(6, 182, 212, 0.15)',
              border: '1px solid rgba(6, 182, 212, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cyan-bright)'
            }}>
              <Activity size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{selectedInfra.name}</h2>
                <span className={`badge ${getBadgeClass(selectedInfra.riskCategory)}`}>
                  {selectedInfra.riskCategory}
                </span>
                <span className="badge-pill">{selectedInfra.subType || selectedInfra.type}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={13} color="var(--cyan-bright)" />
                  {selectedInfra.city}, {selectedInfra.state}
                </span>
                <span>•</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>ID: {selectedInfra.id}</span>
                <span>•</span>
                <span>Age: <strong>{selectedInfra.age} years</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedInfra(null)}
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

        {/* Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Metrics Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px'
          }}>
            <div style={{
              background: 'rgba(11, 19, 41, 0.75)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '14px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Health Score</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: selectedInfra.healthScore > 65 ? 'var(--risk-healthy)' : selectedInfra.healthScore > 40 ? 'var(--risk-moderate)' : 'var(--risk-critical)', fontFamily: 'var(--font-mono)' }}>
                {selectedInfra.healthScore} <span style={{ fontSize: '0.85rem' }}>/100</span>
              </div>
            </div>

            <div style={{
              background: 'rgba(11, 19, 41, 0.75)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '14px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Risk Score</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: selectedInfra.riskScore < 30 ? 'var(--risk-healthy)' : selectedInfra.riskScore < 55 ? 'var(--risk-moderate)' : 'var(--risk-critical)', fontFamily: 'var(--font-mono)' }}>
                {selectedInfra.riskScore} <span style={{ fontSize: '0.85rem' }}>/100</span>
              </div>
            </div>

            <div style={{
              background: 'rgba(11, 19, 41, 0.75)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '14px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Crack Width</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                {selectedInfra.crackMeasurement} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>mm</span>
              </div>
            </div>

            <div style={{
              background: 'rgba(11, 19, 41, 0.75)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '14px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Vibration</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                {selectedInfra.vibrationLevel} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>mm/s</span>
              </div>
            </div>

            <div style={{
              background: 'rgba(11, 19, 41, 0.75)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '14px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Deformation</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                {selectedInfra.structuralDeformation} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>mm</span>
              </div>
            </div>

            <div style={{
              background: 'rgba(11, 19, 41, 0.75)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '14px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Moisture</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                {selectedInfra.moistureLevel} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>%</span>
              </div>
            </div>
          </div>

          {/* Historical Mini Chart */}
          {selectedInfra.historicalTrends && selectedInfra.historicalTrends.length > 0 && (
            <div style={{
              background: 'rgba(11, 19, 41, 0.65)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: '700' }}>
                  <TrendingUp size={16} color="var(--cyan-bright)" />
                  <span>6-Month Sensor Telemetry & Health History</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.74rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', background: '#06b6d4', borderRadius: '2px' }} />
                    Vibration (mm/s)
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '2px' }} />
                    Health Index (/100)
                  </span>
                </div>
              </div>

              <div style={{ height: '180px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedInfra.historicalTrends}>
                    <defs>
                      <linearGradient id="vibGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} domain={[0, 'auto']} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#38bdf8',
                        borderRadius: '8px',
                        color: '#f8fafc'
                      }}
                    />
                    <Area type="monotone" dataKey="vibration" stroke="#06b6d4" fill="url(#vibGrad)" strokeWidth={2} name="Vibration (mm/s)" />
                    <Area type="monotone" dataKey="health" stroke="#f59e0b" fill="url(#healthGrad)" strokeWidth={2} name="Health Score" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Observed Defects & Recommendations */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{
              background: 'rgba(11, 19, 41, 0.65)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: '700', color: '#f59e0b', marginBottom: '10px' }}>
                <AlertTriangle size={15} />
                <span>Observed Anomalies & Defects</span>
              </div>
              <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {selectedInfra.keyDefects && selectedInfra.keyDefects.map((defect, idx) => (
                  <li key={idx}>{defect}</li>
                ))}
              </ul>
            </div>

            <div style={{
              background: 'rgba(11, 19, 41, 0.65)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: '700', color: 'var(--cyan-bright)', marginBottom: '10px' }}>
                <Wrench size={15} />
                <span>Recommended Action & Protocol</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {selectedInfra.recommendedAction}
              </p>
              <div style={{ marginTop: '12px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Traffic Intensity: <strong style={{ color: '#fff' }}>{selectedInfra.trafficVolume}</strong>
              </div>
            </div>
          </div>

          {/* Inspector details */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.76rem',
            color: 'var(--text-muted)',
            padding: '10px 14px',
            background: 'rgba(11, 19, 41, 0.4)',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <UserCheck size={14} color="var(--cyan-bright)" />
              <span>Inspector: <strong style={{ color: 'var(--text-primary)' }}>{selectedInfra.inspectionOfficer}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={14} />
              <span>Audited: {selectedInfra.lastInspectionDate}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={handleDelete}
          >
            <Trash2 size={15} />
            <span>Delete Asset</span>
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setSelectedInfra(null)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleRunAssessment}
            >
              <Cpu size={15} />
              <span>Evaluate in AI Risk Form</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
