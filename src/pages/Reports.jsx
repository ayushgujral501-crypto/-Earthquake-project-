import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Printer,
  Download,
  Filter,
  CheckCircle,
  AlertTriangle,
  Building2,
  Calendar,
  ShieldCheck,
  UserCheck,
  FileSpreadsheet
} from 'lucide-react';

export const Reports = () => {
  const { infrastructure, stats, alerts } = useApp();

  const [reportScope, setReportScope] = useState('All'); // 'All', 'Critical_High', 'Bridge', 'Road', 'Building'
  const [reportDate] = useState(() => new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }));

  const filteredAssets = infrastructure.filter(item => {
    if (reportScope === 'Critical_High') return item.riskScore > 50;
    if (reportScope === 'Bridge') return item.type === 'Bridge';
    if (reportScope === 'Road') return item.type === 'Road';
    if (reportScope === 'Building') return item.type === 'Building';
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Type', 'Subtype', 'State', 'City', 'Age', 'Health Score', 'Risk Score', 'Risk Category', 'Crack (mm)', 'Vibration (mm/s)', 'Deformation (mm)', 'Moisture (%)', 'Recommended Action'];
    const rows = filteredAssets.map(a => [
      `"${a.id}"`,
      `"${a.name}"`,
      `"${a.type}"`,
      `"${a.subType || ''}"`,
      `"${a.state}"`,
      `"${a.city}"`,
      a.age,
      a.healthScore,
      a.riskScore,
      `"${a.riskCategory}"`,
      a.crackMeasurement,
      a.vibrationLevel,
      a.structuralDeformation,
      a.moistureLevel,
      `"${(a.recommendedAction || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `InfraGuard_AI_Assessment_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page-wrapper">
      {/* Header with Print & Export Controls */}
      <div className="page-header no-print">
        <div>
          <h1 className="page-title">
            <FileText color="var(--cyan-bright)" size={28} />
            Infrastructure Audit & Assessment Reports
          </h1>
          <p className="page-subtitle">
            Generate formal engineering dossiers, regulatory compliance summaries, and exportable structural audit archives
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleExportCSV}
            className="btn btn-secondary btn-sm"
          >
            <FileSpreadsheet size={15} color="var(--cyan-bright)" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="btn btn-primary btn-sm"
          >
            <Printer size={15} />
            <span>Download Report (Print / PDF)</span>
          </button>
        </div>
      </div>

      {/* Scope Filter Controls (Hidden in print) */}
      <div className="glass-card no-print" style={{ marginBottom: '20px', padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Filter size={16} color="var(--cyan-bright)" />
            <span style={{ fontSize: '0.84rem', fontWeight: '600' }}>Report Scope:</span>
            <select
              className="form-control"
              style={{ width: 'auto', padding: '5px 12px', fontSize: '0.82rem' }}
              value={reportScope}
              onChange={(e) => setReportScope(e.target.value)}
            >
              <option value="All">Comprehensive Fleet Audit (All Assets)</option>
              <option value="Critical_High">High & Critical Risk Priority Assets Only</option>
              <option value="Bridge">Bridge Structural Dossier</option>
              <option value="Road">Expressway & Highway Infrastructure</option>
              <option value="Building">Public Buildings & Monuments</option>
            </select>
          </div>

          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Audit Sample: <strong>{filteredAssets.length}</strong> facilities included
          </span>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="glass-card" style={{ padding: '36px', background: 'rgba(11, 19, 41, 0.92)' }}>
        {/* Document Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '2px solid rgba(56, 189, 248, 0.3)',
          paddingBottom: '24px',
          marginBottom: '24px'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '1.4rem',
              fontWeight: '800',
              color: '#ffffff'
            }}>
              <ShieldCheck size={28} color="var(--cyan-bright)" />
              <span>InfraGuard AI</span>
              <span style={{ fontSize: '0.8rem', background: 'rgba(6, 182, 212, 0.2)', color: 'var(--cyan-bright)', padding: '2px 8px', borderRadius: '4px' }}>
                Civil IoT System
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              National Infrastructure Health Monitoring & Risk Assessment Directive
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Ministry of Road Transport & Highways / National Infrastructure Directorate Simulation
            </div>
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <div>Doc Ref: <strong style={{ color: '#fff', fontFamily: 'var(--font-mono)' }}>INFRAG-REP-{String(Date.now()).slice(-6)}</strong></div>
            <div>Date of Issue: <strong style={{ color: '#fff' }}>{reportDate}</strong></div>
            <div>Classification: <strong style={{ color: 'var(--cyan-bright)' }}>Official Audit</strong></div>
          </div>
        </div>

        {/* Executive Summary Section */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>
            1. Executive Assessment Summary
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            This technical audit evaluates <strong>{filteredAssets.length}</strong> critical infrastructure assets across Indian states using continuous IoT sensor telemetry and transparent AI risk index algorithms. The fleet currently registers an aggregate structural health average of <strong>{stats.avgHealth}%</strong>. 
            {stats.critical > 0 && ` Immediate intervention protocols have been initiated for ${stats.critical} critical assets exceeding safe elastic deformation thresholds.`}
          </p>
        </div>

        {/* Fleet Key Stats Table */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px',
          marginBottom: '28px'
        }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Assessed Units</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff' }}>{filteredAssets.length}</div>
          </div>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Healthy (Low Risk)</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--risk-healthy)' }}>
              {filteredAssets.filter(i => i.riskCategory === 'Low Risk').length}
            </div>
          </div>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Moderate Risk</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--risk-moderate)' }}>
              {filteredAssets.filter(i => i.riskCategory === 'Moderate Risk').length}
            </div>
          </div>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>High Risk</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--risk-high)' }}>
              {filteredAssets.filter(i => i.riskCategory === 'High Risk').length}
            </div>
          </div>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Critical Risk</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--risk-critical)' }}>
              {filteredAssets.filter(i => i.riskCategory === 'Critical Risk').length}
            </div>
          </div>
        </div>

        {/* Detailed Infrastructure Table */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '12px', color: '#fff' }}>
            2. Detailed Telemetry & Risk Index Inventory
          </h3>

          <div className="table-container">
            <table className="custom-table" style={{ fontSize: '0.8rem' }}>
              <thead>
                <tr>
                  <th>Asset Name</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Age</th>
                  <th>Crack (mm)</th>
                  <th>Vibration</th>
                  <th>Deformation</th>
                  <th>Risk Tier</th>
                  <th>Action Protocol</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map(asset => (
                  <tr key={asset.id}>
                    <td style={{ fontWeight: '700', color: '#f8fafc' }}>
                      {asset.name}
                    </td>
                    <td>{asset.city}, {asset.state}</td>
                    <td>{asset.type}</td>
                    <td>{asset.age}y</td>
                    <td>{asset.crackMeasurement}</td>
                    <td>{asset.vibrationLevel} mm/s</td>
                    <td>{asset.structuralDeformation} mm</td>
                    <td>
                      <span className={`badge ${
                        asset.riskCategory === 'Critical Risk' ? 'badge-critical' :
                        asset.riskCategory === 'High Risk' ? 'badge-high' :
                        asset.riskCategory === 'Moderate Risk' ? 'badge-moderate' : 'badge-healthy'
                      }`} style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                        {asset.riskCategory} ({asset.riskScore})
                      </span>
                    </td>
                    <td style={{ fontSize: '0.74rem', maxWidth: '200px' }}>
                      {asset.recommendedAction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Regulatory Sign-off and Certification */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Audit Methodology Standard:</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              IRC:SP:35-2022 Guidelines & IS 456 Structural Verification Heuristics
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Academic Prototype — Generated by InfraGuard AI
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ width: '160px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '6px' }}></div>
            <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#f8fafc' }}>
              Er. A. K. Deshmukh, FIE
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
              Chief Structural Auditor & Assessor
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
