import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  AlertTriangle,
  Flame,
  CheckCircle,
  Filter,
  Search,
  Check,
  RotateCcw,
  ShieldAlert,
  Clock,
  MapPin
} from 'lucide-react';

export const AlertsNotifications = () => {
  const { alerts, resolveAlert, setSelectedInfra, infrastructure } = useApp();

  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Active', 'Resolved'
  const [severityFilter, setSeverityFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredAlerts = alerts.filter(a => {
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    const matchesSeverity = severityFilter === 'All' || a.severity === severityFilter || a.riskLevel === severityFilter;
    const matchesSearch = !search ||
      a.infrastructureName.toLowerCase().includes(search.toLowerCase()) ||
      a.location.toLowerCase().includes(search.toLowerCase()) ||
      a.alertType.toLowerCase().includes(search.toLowerCase()) ||
      a.message.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSeverity && matchesSearch;
  });

  const activeAlertsCount = alerts.filter(a => a.status === 'Active').length;
  const criticalCount = alerts.filter(a => a.status === 'Active' && (a.severity === 'critical' || a.riskLevel === 'Critical Risk')).length;
  const resolvedCount = alerts.filter(a => a.status === 'Resolved').length;

  const handleOpenAsset = (infraId) => {
    const asset = infrastructure.find(i => i.id === infraId);
    if (asset) {
      setSelectedInfra(asset);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Bell color="var(--cyan-bright)" size={28} />
            Alerts & Anomaly Notifications
          </h1>
          <p className="page-subtitle">
            Autonomous threshold violation alerts, seismic resonance warnings, and engineer intervention dispatches
          </p>
        </div>

        {/* Quick status count pills */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <span style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#f87171',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Flame size={14} />
            {criticalCount} Critical Active
          </span>

          <span style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#34d399',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <CheckCircle size={14} />
            {resolvedCount} Resolved
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card" style={{ marginBottom: '20px', padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Status Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <Filter size={14} color="var(--cyan-bright)" />
              <span>Status:</span>
              <select
                className="form-control"
                style={{ padding: '4px 10px', fontSize: '0.8rem', width: 'auto' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses ({alerts.length})</option>
                <option value="Active">Active Unresolved ({activeAlertsCount})</option>
                <option value="Resolved">Resolved ({resolvedCount})</option>
              </select>
            </div>

            {/* Severity Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <span>Severity:</span>
              <select
                className="form-control"
                style={{ padding: '4px 10px', fontSize: '0.8rem', width: 'auto' }}
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
              >
                <option value="All">All Severities</option>
                <option value="critical">Critical Risk</option>
                <option value="high">High Risk</option>
                <option value="moderate">Moderate Risk</option>
              </select>
            </div>
          </div>

          {/* Search */}
          <div style={{ minWidth: '240px' }}>
            <input
              type="text"
              placeholder="Search alert messages..."
              className="form-control"
              style={{ padding: '6px 12px', fontSize: '0.82rem' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Alerts Table / Cards */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Infrastructure Asset</th>
              <th>Location</th>
              <th>Alert Classification</th>
              <th>Risk Severity</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                  <CheckCircle size={32} color="var(--risk-healthy)" style={{ margin: '0 auto 10px' }} />
                  <div>No alerts matching the selected filter criteria.</div>
                </td>
              </tr>
            ) : (
              filteredAlerts.map(alert => {
                const isCritical = alert.severity === 'critical' || alert.riskLevel === 'Critical Risk';
                const isHigh = alert.severity === 'high' || alert.riskLevel === 'High Risk';
                const isResolved = alert.status === 'Resolved';

                const badgeClass = isCritical
                  ? 'badge-critical'
                  : isHigh
                  ? 'badge-high'
                  : 'badge-moderate';

                return (
                  <tr key={alert.id} style={{ opacity: isResolved ? 0.65 : 1 }}>
                    {/* Name */}
                    <td>
                      <div
                        onClick={() => handleOpenAsset(alert.infrastructureId)}
                        style={{
                          fontWeight: '700',
                          color: '#f8fafc',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>{alert.infrastructureName}</span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {alert.id}
                      </div>
                    </td>

                    {/* Location */}
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} color="var(--cyan-bright)" />
                        <span>{alert.location}</span>
                      </div>
                    </td>

                    {/* Alert Type & Message */}
                    <td>
                      <div style={{ fontWeight: '600', fontSize: '0.84rem', color: '#f8fafc' }}>
                        {alert.alertType}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', maxWidth: '280px', lineHeight: 1.3 }}>
                        {alert.message}
                      </div>
                    </td>

                    {/* Risk Level */}
                    <td>
                      <span className={`badge ${badgeClass}`}>
                        {alert.riskLevel}
                      </span>
                    </td>

                    {/* Date */}
                    <td style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} />
                        <span>{alert.date}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td>
                      {isResolved ? (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: '#34d399',
                          fontSize: '0.76rem',
                          fontWeight: '700'
                        }}>
                          <CheckCircle size={14} />
                          Resolved
                        </span>
                      ) : (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: '#f87171',
                          fontSize: '0.76rem',
                          fontWeight: '700'
                        }}>
                          <Flame size={14} />
                          Active Alarm
                        </span>
                      )}
                    </td>

                    {/* Action button */}
                    <td style={{ textAlign: 'right' }}>
                      {isResolved ? (
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          Closed
                        </span>
                      ) : (
                        <button
                          onClick={() => resolveAlert(alert.id)}
                          className="btn btn-success btn-sm"
                          style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                        >
                          <Check size={13} />
                          <span>Mark Resolved</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
