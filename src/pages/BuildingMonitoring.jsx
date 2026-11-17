import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Search,
  Filter,
  MapPin,
  AlertTriangle,
  ArrowUpDown,
  Plus,
  Shield,
  Clock
} from 'lucide-react';

export const BuildingMonitoring = () => {
  const {
    infrastructure,
    setSelectedInfra,
    setIsAddModalOpen,
    searchQuery
  } = useApp();

  const [buildingFilter, setBuildingFilter] = useState('All');
  const [sortField, setSortField] = useState('riskScore');

  const buildings = infrastructure.filter(i => i.type === 'Building');

  const filteredBuildings = buildings
    .filter(b => {
      const matchesSearch = !searchQuery ||
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.subType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRisk = buildingFilter === 'All' || b.riskCategory === buildingFilter;
      return matchesSearch && matchesRisk;
    })
    .sort((a, b) => {
      if (sortField === 'riskScore') return b.riskScore - a.riskScore;
      if (sortField === 'healthScore') return b.healthScore - a.healthScore;
      if (sortField === 'age') return b.age - a.age;
      return 0;
    });

  const bldgStats = {
    total: buildings.length,
    healthy: buildings.filter(b => b.riskCategory === 'Low Risk').length,
    moderate: buildings.filter(b => b.riskCategory === 'Moderate Risk').length,
    high: buildings.filter(b => b.riskCategory === 'High Risk').length,
    critical: buildings.filter(b => b.riskCategory === 'Critical Risk').length,
    avgAge: Math.round(buildings.reduce((a, b) => a + b.age, 0) / (buildings.length || 1)),
    totalSensors: buildings.reduce((a, b) => a + (b.sensorsActive || 40), 0)
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
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Building2 color="var(--cyan-bright)" size={28} />
            Building & Heritage Structure Monitoring
          </h1>
          <p className="page-subtitle">
            Tiltmeter inclinations, seismic shear strain, foundation moisture permeation, and masonry stress cracks
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary btn-sm"
        >
          <Plus size={16} />
          <span>Add Building Asset</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <div className="glass-card stat-card" style={{ '--card-accent': '#06b6d4' }}>
          <div className="stat-card-title">Monitored Facilities</div>
          <div className="stat-card-value">{bldgStats.total}</div>
          <div className="stat-card-footer">IT Parks, Towers & Heritage Blocks</div>
        </div>

        <div className="glass-card stat-card" style={{ '--card-accent': '#10b981' }}>
          <div className="stat-card-title">Structural Stability</div>
          <div className="stat-card-value" style={{ color: '#10b981' }}>{bldgStats.healthy}</div>
          <div className="stat-card-footer">Zero significant foundation shift</div>
        </div>

        <div className="glass-card stat-card" style={{ '--card-accent': '#f59e0b' }}>
          <div className="stat-card-title">Moderate Risk</div>
          <div className="stat-card-value" style={{ color: '#f59e0b' }}>{bldgStats.moderate}</div>
          <div className="stat-card-footer">Parapet and facade inspection</div>
        </div>

        <div className="glass-card stat-card" style={{ '--card-accent': '#ef4444' }}>
          <div className="stat-card-title">Critical Heritage Alerts</div>
          <div className="stat-card-value" style={{ color: '#ef4444' }}>{bldgStats.high + bldgStats.critical}</div>
          <div className="stat-card-footer">Continuous train vibration stress</div>
        </div>

        <div className="glass-card stat-card" style={{ '--card-accent': '#a855f7' }}>
          <div className="stat-card-title">Structural Tilt Sensors</div>
          <div className="stat-card-value" style={{ color: '#c084fc' }}>{bldgStats.totalSensors}</div>
          <div className="stat-card-footer">Mean Facility Age: {bldgStats.avgAge} Years</div>
        </div>
      </div>

      {/* Filter and Sort */}
      <div className="glass-card" style={{ marginBottom: '20px', padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <Filter size={14} color="var(--cyan-bright)" />
              <span>Safety Filter:</span>
              <select
                className="form-control"
                style={{ padding: '4px 10px', fontSize: '0.8rem', width: 'auto' }}
                value={buildingFilter}
                onChange={(e) => setBuildingFilter(e.target.value)}
              >
                <option value="All">All Buildings</option>
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
                <option value="healthScore">Health Index</option>
                <option value="age">Age (Heritage First)</option>
              </select>
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredBuildings.length}</strong> buildings
          </div>
        </div>
      </div>

      {/* Buildings Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '18px'
      }}>
        {filteredBuildings.map((building) => {
          const badgeClass = getBadgeClass(building.riskCategory);

          return (
            <div
              key={building.id}
              onClick={() => setSelectedInfra(building)}
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
                      {building.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      <MapPin size={12} color="var(--cyan-bright)" />
                      <span>{building.city}, {building.state}</span>
                      <span>•</span>
                      <span className="badge-pill">{building.subType}</span>
                    </div>
                  </div>
                  <span className={`badge ${badgeClass}`}>
                    {building.riskCategory}
                  </span>
                </div>

                {/* Sensor Metrics */}
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
                      {building.crackMeasurement}mm
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>Vibration</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                      {building.vibrationLevel}mm/s
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>Tilt / Defl</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                      {building.structuralDeformation}mm
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>Moisture</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: building.moistureLevel > 65 ? '#ef4444' : '#10b981', fontFamily: 'var(--font-mono)' }}>
                      {building.moistureLevel}%
                    </div>
                  </div>
                </div>

                {/* Observed Defect */}
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '10px', minHeight: '36px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Structural Observation: </span>
                  {building.keyDefects && building.keyDefects[0]}
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
                  Occupancy: <strong style={{ color: '#fff' }}>{building.trafficVolume}</strong>
                </span>
                <span style={{ color: 'var(--cyan-bright)', fontWeight: '700' }}>
                  Inspect Telemetry &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
