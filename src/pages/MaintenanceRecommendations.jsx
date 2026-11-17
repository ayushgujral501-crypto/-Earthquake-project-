import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wrench,
  AlertTriangle,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  IndianRupee,
  Clock,
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const MaintenanceRecommendations = () => {
  const { infrastructure, maintenanceCatalog, setSelectedInfra } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('Critical Risk');

  const selectedTier = maintenanceCatalog.find(c => c.riskCategory === selectedCategory) || maintenanceCatalog[0];

  // Assets in this selected category
  const assetsInTier = infrastructure.filter(i => i.riskCategory === selectedCategory);

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Wrench color="var(--cyan-bright)" size={28} />
            Preventative & Remedial Maintenance Protocols
          </h1>
          <p className="page-subtitle">
            Lifecycle engineering interventions, retrofitting roadmaps, and budget allocation by risk tier
          </p>
        </div>
      </div>

      {/* 4 Risk Category Selector Tabs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '14px',
        marginBottom: '24px'
      }}>
        {maintenanceCatalog.map((tier) => {
          const isActive = selectedCategory === tier.riskCategory;
          const count = infrastructure.filter(i => i.riskCategory === tier.riskCategory).length;

          return (
            <button
              key={tier.riskCategory}
              onClick={() => setSelectedCategory(tier.riskCategory)}
              style={{
                background: isActive ? 'rgba(15, 23, 42, 0.95)' : 'rgba(11, 19, 41, 0.65)',
                border: isActive ? `2px solid ${tier.color}` : '1px solid var(--border-subtle)',
                boxShadow: isActive ? `0 0 20px ${tier.color}33` : 'none',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '800', color: tier.color }}>
                  {tier.riskCategory}
                </span>
                <span style={{
                  background: `${tier.color}22`,
                  color: tier.color,
                  border: `1px solid ${tier.color}44`,
                  padding: '2px 8px',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontWeight: '800'
                }}>
                  {count} Assets
                </span>
              </div>

              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                Response Window: <strong style={{ color: '#fff' }}>{tier.urgency}</strong>
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Tier Details & Action Plan */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px'
      }}>
        {/* Left: Engineering Action Protocols */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: `${selectedTier.color}22`,
                border: `1px solid ${selectedTier.color}55`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: selectedTier.color
              }}>
                <Wrench size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>
                  {selectedTier.riskCategory} Standard Operating Procedures
                </h3>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                  Target Completion Window: <strong>{selectedTier.urgency}</strong>
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {selectedTier.actions.map((act, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(11, 19, 41, 0.7)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color={selectedTier.color} />
                    <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#f8fafc' }}>
                      {act.title}
                    </span>
                  </div>
                  <span className="badge-pill" style={{ color: 'var(--cyan-bright)' }}>
                    {act.frequency}
                  </span>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {act.desc}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '4px',
                  fontSize: '0.76rem',
                  color: 'var(--text-muted)',
                  borderTop: '1px dashed var(--border-subtle)',
                  paddingTop: '8px'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <IndianRupee size={13} color="var(--cyan-bright)" />
                    <span>Estimated Budget: <strong style={{ color: '#fff' }}>{act.costRange}</strong></span>
                  </span>
                  <span style={{ color: 'var(--cyan-bright)' }}>
                    Standard CPWD / IRC Code
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Assets Currently in this Risk Category */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>
                Affected Assets ({assetsInTier.length})
              </h3>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                Infrastructure currently flagged under {selectedTier.riskCategory}
              </p>
            </div>
            <span className="badge-pill">{selectedTier.riskCategory}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {assetsInTier.length === 0 ? (
              <div style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <CheckCircle2 size={32} color="var(--risk-healthy)" style={{ margin: '0 auto 10px' }} />
                No infrastructure facilities currently fall under this risk tier.
              </div>
            ) : (
              assetsInTier.map(asset => (
                <div
                  key={asset.id}
                  onClick={() => setSelectedInfra(asset)}
                  className="glass-card-hover"
                  style={{
                    background: 'rgba(11, 19, 41, 0.7)',
                    border: `1px solid ${selectedTier.color}44`,
                    borderRadius: '10px',
                    padding: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#fff' }}>
                      {asset.name}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: '800',
                      color: selectedTier.color
                    }}>
                      Risk: {asset.riskScore}/100
                    </span>
                  </div>

                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {asset.city}, {asset.state} • {asset.subType} • Age: {asset.age} yrs
                  </div>

                  <div style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                    background: 'rgba(15, 23, 42, 0.6)',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    marginTop: '4px'
                  }}>
                    <strong style={{ color: 'var(--cyan-bright)' }}>Action Required: </strong>
                    {asset.recommendedAction}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
