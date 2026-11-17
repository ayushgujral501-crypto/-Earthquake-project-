import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Activity,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle,
  Plus
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area
} from 'recharts';

export const Dashboard = () => {
  const {
    infrastructure,
    alerts,
    stats,
    setActiveTab,
    setSelectedInfra,
    setIsAddModalOpen,
    resolveAlert
  } = useApp();

  // Color scheme for Risk Pie
  const RISK_COLORS = {
    'Low Risk': '#10b981',
    'Moderate Risk': '#f59e0b',
    'High Risk': '#f97316',
    'Critical Risk': '#ef4444'
  };

  const riskDistributionData = [
    { name: 'Healthy (Low Risk)', value: stats.healthy, color: RISK_COLORS['Low Risk'] },
    { name: 'Moderate Risk', value: stats.moderate, color: RISK_COLORS['Moderate Risk'] },
    { name: 'High Risk', value: stats.high, color: RISK_COLORS['High Risk'] },
    { name: 'Critical Risk', value: stats.critical, color: RISK_COLORS['Critical Risk'] }
  ].filter(d => d.value > 0);

  // Asset type breakdown for Bar Chart
  const typeHealthData = [
    {
      type: 'Bridges',
      total: stats.bridges,
      avgHealth: Math.round(
        infrastructure.filter(i => i.type === 'Bridge').reduce((a, c) => a + c.healthScore, 0) / (stats.bridges || 1)
      ),
      highRisk: infrastructure.filter(i => i.type === 'Bridge' && (i.riskScore > 50)).length
    },
    {
      type: 'Roads / Highways',
      total: stats.roads,
      avgHealth: Math.round(
        infrastructure.filter(i => i.type === 'Road').reduce((a, c) => a + c.healthScore, 0) / (stats.roads || 1)
      ),
      highRisk: infrastructure.filter(i => i.type === 'Road' && (i.riskScore > 50)).length
    },
    {
      type: 'Buildings / Monuments',
      total: stats.buildings,
      avgHealth: Math.round(
        infrastructure.filter(i => i.type === 'Building').reduce((a, c) => a + c.healthScore, 0) / (stats.buildings || 1)
      ),
      highRisk: infrastructure.filter(i => i.type === 'Building' && (i.riskScore > 50)).length
    }
  ];

  // Recently monitored
  const recentAssets = [...infrastructure].slice(0, 5);

  // Recent unresolved alerts
  const recentAlerts = alerts.filter(a => a.status !== 'Resolved').slice(0, 4);

  // AI-generated fleet intelligence summary
  const generateAISummary = () => {
    const criticalList = infrastructure.filter(i => i.riskCategory === 'Critical Risk').map(i => i.name);
    const highList = infrastructure.filter(i => i.riskCategory === 'High Risk').map(i => i.name);

    if (stats.critical > 0) {
      return `Fleet AI Analysis: Urgent intervention required. ${stats.critical} asset(s) (${criticalList.join(', ')}) exceed critical structural deformation and vibration thresholds. Recommended: immediate load diversion and hydraulic stress mitigation. Meanwhile, ${stats.healthy} out of ${stats.total} facilities are operating within normal elastic limits.`;
    }
    if (stats.high > 0) {
      return `Fleet AI Analysis: Fleet operating with moderate-to-high variance. ${stats.high} asset(s) (${highList.join(', ')}) show early-to-mid stage fatigue micro-cracking and requires non-destructive testing within 30 days. Overall national fleet health index is stable at ${stats.avgHealth}%.`;
    }
    return `Fleet AI Analysis: All ${stats.total} monitored facilities across Indian states are functioning stably within design parameters. Average health index is strong at ${stats.avgHealth}%. Regular quarterly telemetry validation recommended.`;
  };

  return (
    <div className="page-wrapper">
      {/* Page Title & Quick Actions */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Activity color="var(--cyan-bright)" size={28} />
            Infrastructure Fleet Dashboard
          </h1>
          <p className="page-subtitle">
            AI-powered continuous structural health monitoring & real-time risk assessment overview
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('eq-history')}
            className="btn btn-secondary btn-sm"
            style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#fca5a5' }}
          >
            <Flame size={15} color="#ef4444" />
            <span>Earthquake History</span>
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className="btn btn-secondary btn-sm"
          >
            <MapPin size={15} color="var(--cyan-bright)" />
            <span>Interactive Map</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} />
            <span>Enroll New Asset</span>
          </button>
        </div>
      </div>

      {/* 5 Core Statistics Cards */}
      <div className="stats-grid">
        {/* Total Infrastructure */}
        <div className="glass-card stat-card" style={{ '--card-accent': 'var(--cyan-primary)' }}>
          <div className="stat-card-header">
            <span className="stat-card-title">Total Infrastructure</span>
            <div className="stat-card-icon" style={{ color: 'var(--cyan-bright)' }}>
              <Layers size={18} />
            </div>
          </div>
          <div className="stat-card-value" style={{ color: '#ffffff' }}>
            {stats.total}
          </div>
          <div className="stat-card-footer">
            <span>{stats.bridges} Bridges • {stats.roads} Roads • {stats.buildings} Buildings</span>
          </div>
        </div>

        {/* Healthy Infrastructure */}
        <div className="glass-card stat-card" style={{ '--card-accent': 'var(--risk-healthy)' }}>
          <div className="stat-card-header">
            <span className="stat-card-title">Healthy (Low Risk)</span>
            <div className="stat-card-icon" style={{ color: 'var(--risk-healthy)' }}>
              <ShieldCheck size={18} />
            </div>
          </div>
          <div className="stat-card-value" style={{ color: 'var(--risk-healthy)' }}>
            {stats.healthy}
          </div>
          <div className="stat-card-footer">
            <span>{stats.total > 0 ? Math.round((stats.healthy / stats.total) * 100) : 0}% of active fleet</span>
          </div>
        </div>

        {/* Moderate Risk */}
        <div className="glass-card stat-card" style={{ '--card-accent': 'var(--risk-moderate)' }}>
          <div className="stat-card-header">
            <span className="stat-card-title">Moderate Risk</span>
            <div className="stat-card-icon" style={{ color: 'var(--risk-moderate)' }}>
              <Activity size={18} />
            </div>
          </div>
          <div className="stat-card-value" style={{ color: 'var(--risk-moderate)' }}>
            {stats.moderate}
          </div>
          <div className="stat-card-footer">
            <span>Preventative maintenance priority</span>
          </div>
        </div>

        {/* High Risk */}
        <div className="glass-card stat-card" style={{ '--card-accent': 'var(--risk-high)' }}>
          <div className="stat-card-header">
            <span className="stat-card-title">High Risk</span>
            <div className="stat-card-icon" style={{ color: 'var(--risk-high)' }}>
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="stat-card-value" style={{ color: 'var(--risk-high)' }}>
            {stats.high}
          </div>
          <div className="stat-card-footer">
            <span>Requires NDT inspection within 30d</span>
          </div>
        </div>

        {/* Critical Risk */}
        <div className="glass-card stat-card" style={{ '--card-accent': 'var(--risk-critical)' }}>
          <div className="stat-card-header">
            <span className="stat-card-title">Critical Risk</span>
            <div className="stat-card-icon" style={{ color: 'var(--risk-critical)' }}>
              <Flame size={18} />
            </div>
          </div>
          <div className="stat-card-value" style={{ color: 'var(--risk-critical)' }}>
            {stats.critical}
          </div>
          <div className="stat-card-footer">
            <span style={{ color: '#fca5a5' }}>Immediate load restriction</span>
          </div>
        </div>
      </div>

      {/* AI Fleet Intelligence Summary Banner */}
      <div className="glass-card glass-card-highlight" style={{
        marginBottom: '24px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(11, 28, 59, 0.75) 100%)',
        borderColor: 'rgba(6, 182, 212, 0.35)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(6,182,212,0.3) 0%, rgba(59,130,246,0.3) 100%)',
            border: '1px solid rgba(6,182,212,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--cyan-bright)',
            flexShrink: 0
          }}>
            <Sparkles size={22} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#ffffff', letterSpacing: '0.02em' }}>
                AI-Generated Executive Summary
              </span>
              <span style={{
                background: 'rgba(6,182,212,0.15)',
                color: 'var(--cyan-bright)',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.7rem',
                fontWeight: '700',
                border: '1px solid rgba(6,182,212,0.3)'
              }}>
                Continuous Inference
              </span>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.6 }}>
              {generateAISummary()}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '12px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              <span>Fleet Health Index: <strong style={{ color: 'var(--cyan-bright)' }}>{stats.avgHealth}%</strong></span>
              <span>Active IoT Telemetry Nodes: <strong style={{ color: '#fff' }}>684</strong></span>
              <span>Telemetry Sample Latency: <strong style={{ color: 'var(--risk-healthy)' }}>34 ms</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {/* Risk Distribution Chart */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Risk Distribution</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Breakdown by safety severity tier</p>
            </div>
            <span className="badge-pill">{stats.total} Total Assets</span>
          </div>

          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name) => [`${val} Assets`, name]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38bdf8', borderRadius: '8px' }}
                />
                <Legend
                  formatter={(value) => <span style={{ color: '#cbd5e1', fontSize: '0.78rem' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Infrastructure Health Chart by Sector */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Sector Health & Risk Comparison</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Average condition vs High-Risk assets</p>
            </div>
            <span className="badge-pill">Sector Comparison</span>
          </div>

          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={typeHealthData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="type" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38bdf8', borderRadius: '8px', color: '#fff' }}
                />
                <Legend
                  formatter={(value) => <span style={{ color: '#cbd5e1', fontSize: '0.78rem' }}>{value}</span>}
                />
                <Bar dataKey="avgHealth" fill="#06b6d4" name="Avg Health (/100)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="highRisk" fill="#ef4444" name="High/Critical Risk Assets" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Two Column Bottom Grid: Recent Alerts & Recently Monitored Infrastructure */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '20px'
      }}>
        {/* Recent Alerts Section */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={18} color="var(--risk-critical)" />
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Recent Anomaly Alerts</h3>
            </div>
            <button
              onClick={() => setActiveTab('alerts')}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.74rem', padding: '4px 10px' }}
            >
              <span>View All</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recentAlerts.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <CheckCircle size={28} color="var(--risk-healthy)" style={{ margin: '0 auto 8px' }} />
                No active critical alerts. All systems operational.
              </div>
            ) : (
              recentAlerts.map(alert => (
                <div
                  key={alert.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '9px',
                    background: 'rgba(11, 19, 41, 0.7)',
                    border: `1px solid ${alert.severity === 'critical' ? 'rgba(239, 68, 68, 0.35)' : 'rgba(249, 115, 22, 0.35)'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.84rem', color: '#f8fafc' }}>
                      {alert.infrastructureName}
                    </div>
                    <span className={alert.severity === 'critical' ? 'badge badge-critical' : 'badge badge-high'}>
                      {alert.riskLevel}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {alert.alertType} • {alert.location}
                  </div>

                  <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {alert.message}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.72rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{alert.date}</span>
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className="btn btn-success btn-sm"
                      style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                    >
                      Mark Resolved
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recently Monitored Infrastructure */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} color="var(--cyan-bright)" />
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Monitored Infrastructure</h3>
            </div>
            <button
              onClick={() => setActiveTab('bridges')}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.74rem', padding: '4px 10px' }}
            >
              <span>Explore Fleet</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recentAssets.map(asset => {
              const badgeClass = asset.riskCategory === 'Critical Risk'
                ? 'badge-critical'
                : asset.riskCategory === 'High Risk'
                ? 'badge-high'
                : asset.riskCategory === 'Moderate Risk'
                ? 'badge-moderate'
                : 'badge-healthy';

              return (
                <div
                  key={asset.id}
                  onClick={() => setSelectedInfra(asset)}
                  className="glass-card-hover"
                  style={{
                    padding: '12px 14px',
                    borderRadius: '9px',
                    background: 'rgba(11, 19, 41, 0.7)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.86rem', color: '#f8fafc' }}>
                        {asset.name}
                      </span>
                      <span className="badge-pill">{asset.type}</span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} color="var(--cyan-bright)" />
                      {asset.city}, {asset.state}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Health</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: asset.healthScore > 65 ? 'var(--risk-healthy)' : asset.healthScore > 40 ? 'var(--risk-moderate)' : 'var(--risk-critical)' }}>
                        {asset.healthScore}%
                      </div>
                    </div>
                    <span className={`badge ${badgeClass}`}>
                      {asset.riskCategory}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
