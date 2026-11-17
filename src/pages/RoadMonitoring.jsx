import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Route,
  Search,
  Filter,
  MapPin,
  TrendingUp,
  AlertTriangle,
  ArrowUpDown,
  Plus,
  Car
} from 'lucide-react';

export const RoadMonitoring = () => {
  const {
    infrastructure,
    setSelectedInfra,
    setIsAddModalOpen,
    searchQuery
  } = useApp();

  const [roadFilter, setRoadFilter] = useState('All');
  const [sortField, setSortField] = useState('riskScore');

  const roads = infrastructure.filter(i => i.type === 'Road');

  const filteredRoads = roads
    .filter(road => {
      const matchesSearch = !searchQuery ||
        road.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        road.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        road.subType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRisk = roadFilter === 'All' || road.riskCategory === roadFilter;
      return matchesSearch && matchesRisk;
    })
    .sort((a, b) => {
      if (sortField === 'riskScore') return b.riskScore - a.riskScore;
      if (sortField === 'healthScore') return b.healthScore - a.healthScore;
      if (sortField === 'age') return b.age - a.age;
      return 0;
    });

  const roadStats = {
    total: roads.length,
    healthy: roads.filter(r => r.riskCategory === 'Low Risk').length,
    moderate: roads.filter(r => r.riskCategory === 'Moderate Risk').length,
    high: roads.filter(r => r.riskCategory === 'High Risk').length,
    critical: roads.filter(r => r.riskCategory === 'Critical Risk').length,
    avgHealth: Math.round(roads.reduce((a, b) => a + b.healthScore, 0) / (roads.length || 1)),
    totalKmMonitored: '2,840 km'
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
            <Route color="var(--cyan-bright)" size={28} />
            Road & Expressway Pavement Monitoring
          </h1>
          <p className="page-subtitle">
            Sub-base settlement telemetry, International Roughness Index (IRI), rutting depth, and heavy axle corridor fatigue
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary btn-sm"
        >
          <Plus size={16} />
          <span>Add Road Corridor</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <div className="glass-card stat-card" style={{ '--card-accent': '#06b6d4' }}>
          <div className="stat-card-title">Highway Corridors</div>
          <div className="stat-card-value">{roadStats.total}</div>
          <div className="stat-card-footer">Approx. {roadStats.totalKmMonitored} Instrumented</div>
        </div>

        <div className="glass-card stat-card" style={{ '--card-accent': '#10b981' }}>
          <div className="stat-card-title">Optimal Condition</div>
          <div className="stat-card-value" style={{ color: '#10b981' }}>{roadStats.healthy}</div>
          <div className="stat-card-footer">IRI &lt; 2.0 m/km Smooth Pavement</div>
        </div>

        <div className="glass-card stat-card" style={{ '--card-accent': '#f59e0b' }}>
          <div className="stat-card-title">Moderate Wear</div>
          <div className="stat-card-value" style={{ color: '#f59e0b' }}>{roadStats.moderate}</div>
          <div className="stat-card-footer">Surface friction re-grinding due</div>
        </div>

        <div className="glass-card stat-card" style={{ '--card-accent': '#f97316' }}>
          <div className="stat-card-title">Severe Rutting / High Risk</div>
          <div className="stat-card-value" style={{ color: '#f97316' }}>{roadStats.high + roadStats.critical}</div>
          <div className="stat-card-footer">Fatigue alligator cracking active</div>
        </div>

        <div className="glass-card stat-card" style={{ '--card-accent': '#3b82f6' }}>
          <div className="stat-card-title">Average Pavement Health</div>
          <div className="stat-card-value" style={{ color: '#60a5fa' }}>{roadStats.avgHealth}%</div>
          <div className="stat-card-footer">Across NHAI & State Expressways</div>
        </div>
      </div>

      {/* Filter and Sort */}
      <div className="glass-card" style={{ marginBottom: '20px', padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <Filter size={14} color="var(--cyan-bright)" />
              <span>Filter:</span>
              <select
                className="form-control"
                style={{ padding: '4px 10px', fontSize: '0.8rem', width: 'auto' }}
                value={roadFilter}
                onChange={(e) => setRoadFilter(e.target.value)}
              >
                <option value="All">All Road Assets</option>
                <option value="Low Risk">Healthy (Low Risk)</option>
                <option value="Moderate Risk">Moderate Risk</option>
                <option value="High Risk">High Risk</option>
                <option value="Critical Risk">Critical Risk</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <ArrowUpDown size={14} />
              <span>Sort:</span>
              <select
                className="form-control"
                style={{ padding: '4px 10px', fontSize: '0.8rem', width: 'auto' }}
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="riskScore">Highest Risk Score</option>
                <option value="healthScore">Best Condition</option>
                <option value="age">Corridor Age</option>
              </select>
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredRoads.length}</strong> highway systems
          </div>
        </div>
      </div>

      {/* Roads Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '18px'
      }}>
        {filteredRoads.map((road) => {
          const badgeClass = getBadgeClass(road.riskCategory);

          return (
            <div
              key={road.id}
              onClick={() => setSelectedInfra(road)}
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
                      {road.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      <MapPin size={12} color="var(--cyan-bright)" />
                      <span>{road.city}, {road.state}</span>
                      <span>•</span>
                      <span className="badge-pill">{road.subType}</span>
                    </div>
                  </div>
                  <span className={`badge ${badgeClass}`}>
                    {road.riskCategory}
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
                    <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>Crack / Fissure</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                      {road.crackMeasurement}mm
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>Vibration</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                      {road.vibrationLevel}mm/s
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>Rutting / Sag</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                      {road.structuralDeformation}mm
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>Sub-Moisture</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: road.moistureLevel > 65 ? '#ef4444' : '#10b981', fontFamily: 'var(--font-mono)' }}>
                      {road.moistureLevel}%
                    </div>
                  </div>
                </div>

                {/* Key Road Defects */}
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '10px', minHeight: '36px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Pavement Analysis: </span>
                  {road.keyDefects && road.keyDefects[0]}
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
                  Traffic: <strong style={{ color: '#fff' }}>{road.trafficVolume}</strong>
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
