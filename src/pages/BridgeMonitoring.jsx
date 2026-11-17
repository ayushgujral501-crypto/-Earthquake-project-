import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GitBranch,
  Search,
  Filter,
  Activity,
  Layers,
  MapPin,
  AlertTriangle,
  ArrowUpDown,
  Plus
} from 'lucide-react';

export const BridgeMonitoring = () => {
  const {
    infrastructure,
    setSelectedInfra,
    setIsAddModalOpen,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [bridgeFilter, setBridgeFilter] = useState('All');
  const [sortField, setSortField] = useState('riskScore'); // 'riskScore', 'healthScore', 'age'

  const bridges = infrastructure.filter(i => i.type === 'Bridge');

  const filteredBridges = bridges
    .filter(bridge => {
      const matchesSearch = !searchQuery ||
        bridge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bridge.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bridge.subType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRisk = bridgeFilter === 'All' || bridge.riskCategory === bridgeFilter;
      return matchesSearch && matchesRisk;
    })
    .sort((a, b) => {
      if (sortField === 'riskScore') return b.riskScore - a.riskScore;
      if (sortField === 'healthScore') return b.healthScore - a.healthScore;
      if (sortField === 'age') return b.age - a.age;
      return 0;
    });

  const bridgeStats = {
    total: bridges.length,
    healthy: bridges.filter(b => b.riskCategory === 'Low Risk').length,
    moderate: bridges.filter(b => b.riskCategory === 'Moderate Risk').length,
    high: bridges.filter(b => b.riskCategory === 'High Risk').length,
    critical: bridges.filter(b => b.riskCategory === 'Critical Risk').length,
    avgAge: Math.round(bridges.reduce((a, b) => a + b.age, 0) / (bridges.length || 1)),
    totalSensors: bridges.reduce((a, b) => a + (b.sensorsActive || 30), 0)
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
            <GitBranch color="var(--cyan-bright)" size={28} />
            Bridge Structural Health Monitoring
          </h1>
          <p className="page-subtitle">
            Continuous telemetry of cable tensions, expansion joints, pier scour, dynamic vibrations, and live axle loads
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary btn-sm"
        >
          <Plus size={16} />
          <span>Add Bridge Asset</span>
        </button>
      </div>

      {/* Bridge Fleet Summary Stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <div className="glass-card stat-card" style={{ '--card-accent': '#06b6d4' }}>
          <div className="stat-card-title">Monitored Bridges</div>
          <div className="stat-card-value">{bridgeStats.total}</div>
          <div className="stat-card-footer">Spanning {bridges.map(b => b.state).filter((v, i, a) => a.indexOf(v) === i).length} Indian States</div>
        </div>

        <div className="glass-card stat-card" style={{ '--card-accent': '#10b981' }}>
          <div className="stat-card-title">Stable / Healthy</div>
          <div className="stat-card-value" style={{ color: '#10b981' }}>{bridgeStats.healthy}</div>
          <div className="stat-card-footer">Within safe elastic bounds</div>
        </div>

        <div className="glass-card stat-card" style={{ '--card-accent': '#f59e0b' }}>
          <div className="stat-card-title">Moderate Risk</div>
          <div className="stat-card-value" style={{ color: '#f59e0b' }}>{bridgeStats.moderate}</div>
          <div className="stat-card-footer">Scheduled joint inspection</div>
        </div>

        <div className="glass-card stat-card" style={{ '--card-accent': '#ef4444' }}>
          <div className="stat-card-title">High / Critical</div>
          <div className="stat-card-value" style={{ color: '#ef4444' }}>{bridgeStats.high + bridgeStats.critical}</div>
          <div className="stat-card-footer">Active strain telemetry alert</div>
        </div>

        <div className="glass-card stat-card" style={{ '--card-accent': '#8b5cf6' }}>
          <div className="stat-card-title">Bridge Sensor Nodes</div>
          <div className="stat-card-value" style={{ color: '#a78bfa' }}>{bridgeStats.totalSensors}</div>
          <div className="stat-card-footer">Avg Age: {bridgeStats.avgAge} Years</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card" style={{ marginBottom: '20px', padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <Filter size={14} color="var(--cyan-bright)" />
              <span>Severity Filter:</span>
              <select
                className="form-control"
                style={{ padding: '4px 10px', fontSize: '0.8rem', width: 'auto' }}
                value={bridgeFilter}
                onChange={(e) => setBridgeFilter(e.target.value)}
              >
                <option value="All">All Bridges</option>
                <option value="Low Risk">Healthy (Low Risk)</option>
                <option value="Moderate Risk">Moderate Risk</option>
                <option value="High Risk">High Risk</option>
                <option value="Critical Risk">Critical Risk</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <ArrowUpDown size={14} />
              <span>Sort By:</span>
              <select
                className="form-control"
                style={{ padding: '4px 10px', fontSize: '0.8rem', width: 'auto' }}
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="riskScore">Highest Risk Score</option>
                <option value="healthScore">Best Health Score</option>
                <option value="age">Bridge Age (Oldest First)</option>
              </select>
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredBridges.length}</strong> bridges
          </div>
        </div>
      </div>

      {/* Bridges Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '18px'
      }}>
        {filteredBridges.map((bridge) => {
          const badgeClass = getBadgeClass(bridge.riskCategory);

          return (
            <div
              key={bridge.id}
              onClick={() => setSelectedInfra(bridge)}
              className="glass-card glass-card-hover"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '18px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.02rem', fontWeight: '800', color: '#f8fafc' }}>
                      {bridge.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      <MapPin size={12} color="var(--cyan-bright)" />
                      <span>{bridge.city}, {bridge.state}</span>
                      <span>•</span>
                      <span className="badge-pill">{bridge.subType}</span>
                    </div>
                  </div>
                  <span className={`badge ${badgeClass}`}>
                    {bridge.riskCategory}
                  </span>
                </div>

                {/* Key Sensors Bar */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '8px',
                  background: 'rgba(11, 19, 41, 0.6)',
                  padding: '10px',
                  borderRadius: '8px',
                  margin: '12px 0',
                  textAlign: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>Crack</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                      {bridge.crackMeasurement}mm
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>Vibration</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                      {bridge.vibrationLevel}mm/s
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>Sag/Defl</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                      {bridge.structuralDeformation}mm
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>Age</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--cyan-bright)', fontFamily: 'var(--font-mono)' }}>
                      {bridge.age} yrs
                    </div>
                  </div>
                </div>

                {/* Observed key defect */}
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '10px', minHeight: '36px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Primary Concern: </span>
                  {bridge.keyDefects && bridge.keyDefects[0]}
                </div>
              </div>

              {/* Card Footer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '10px',
                marginTop: '6px',
                fontSize: '0.74rem'
              }}>
                <span style={{ color: 'var(--text-muted)' }}>
                  Sensors: <strong style={{ color: '#fff' }}>{bridge.sensorsActive}</strong> active
                </span>
                <span style={{ color: 'var(--cyan-bright)', fontWeight: '700' }}>
                  Click to Inspect Telemetry &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
