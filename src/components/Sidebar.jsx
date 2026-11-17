import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  MapPin,
  GitBranch,
  Route,
  Building2,
  Cpu,
  Activity,
  Bell,
  Wrench,
  FileText,
  ShieldCheck,
  X,
  RotateCcw,
  History,
  ShieldAlert,
  Flame,
  Scale
} from 'lucide-react';

const INFRA_MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'map', label: 'Infrastructure Map', icon: MapPin },
  { id: 'bridges', label: 'Bridge Monitoring', icon: GitBranch },
  { id: 'roads', label: 'Road Monitoring', icon: Route },
  { id: 'buildings', label: 'Building Monitoring', icon: Building2 },
  { id: 'ai-risk', label: 'AI Structural Risk', icon: Cpu, badgeText: 'AI' },
  { id: 'structural', label: 'Structural Analysis', icon: Activity },
  { id: 'alerts', label: 'Alerts & Notifications', icon: Bell, showBadge: true },
  { id: 'maintenance', label: 'Maintenance SOPs', icon: Wrench },
  { id: 'reports', label: 'Reports', icon: FileText }
];

const EARTHQUAKE_MENU_ITEMS = [
  { id: 'eq-history', label: 'Earthquake History', icon: History, badgeText: 'NCS' },
  { id: 'eq-map', label: 'Earthquake Map', icon: MapPin },
  { id: 'eq-risk', label: 'Earthquake Risk Analysis', icon: ShieldAlert, badgeText: 'PSHA' },
  { id: 'eq-damage', label: 'Damage Assessment', icon: Flame },
  { id: 'eq-compare', label: 'State Comparison', icon: Scale }
];

export const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    mobileMenuOpen,
    setMobileMenuOpen,
    stats,
    resetToSampleData
  } = useApp();

  const handleSelectTab = (id) => {
    setActiveTab(id);
    if (window.innerWidth < 768) {
      setMobileMenuOpen(false);
    }
  };

  const renderNavGroup = (title, items) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '12px' }}>
      <div style={{
        fontSize: '0.68rem',
        fontWeight: '700',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        padding: '6px 12px 4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span>{title}</span>
      </div>

      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => handleSelectTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '9px 12px',
              borderRadius: '8px',
              border: isActive ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid transparent',
              background: isActive
                ? 'linear-gradient(90deg, rgba(6, 182, 212, 0.18) 0%, rgba(14, 23, 42, 0.4) 100%)'
                : 'transparent',
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              textAlign: 'left',
              fontSize: '0.84rem',
              fontWeight: isActive ? '700' : '500',
              boxShadow: isActive ? '0 0 15px rgba(6, 182, 212, 0.12)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
                e.currentTarget.style.color = '#ffffff';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon
                size={17}
                color={isActive ? 'var(--cyan-bright)' : 'currentColor'}
                style={{ transition: 'color 0.18s ease', flexShrink: 0 }}
              />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
            </div>

            {item.showBadge && stats.activeAlerts > 0 && (
              <span style={{
                background: 'var(--risk-critical)',
                color: '#ffffff',
                fontSize: '0.66rem',
                fontWeight: '800',
                padding: '2px 6px',
                borderRadius: '999px',
                boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)'
              }}>
                {stats.activeAlerts}
              </span>
            )}

            {item.badgeText && (
              <span style={{
                background: 'rgba(6, 182, 212, 0.2)',
                color: 'var(--cyan-bright)',
                border: '1px solid rgba(6, 182, 212, 0.35)',
                fontSize: '0.62rem',
                fontWeight: '700',
                padding: '1px 5px',
                borderRadius: '4px'
              }}>
                {item.badgeText}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(3, 7, 18, 0.75)',
            zIndex: 45,
            backdropFilter: 'blur(4px)'
          }}
        />
      )}

      <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        {/* Brand */}
        <div style={{
          padding: '20px 18px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(59,130,246,0.3) 100%)',
              border: '1px solid rgba(6,182,212,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cyan-bright)',
              boxShadow: '0 0 16px rgba(6,182,212,0.25)'
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{
                fontSize: '1.1rem',
                fontWeight: '800',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #ffffff 40%, #38bdf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                InfraGuard <span style={{ color: 'var(--cyan-bright)', WebkitTextFillColor: 'initial', fontSize: '0.75rem', background: 'rgba(6,182,212,0.15)', padding: '1px 5px', borderRadius: '4px', border: '1px solid rgba(6,182,212,0.3)' }}>AI</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>
                Health & Earthquake System
              </div>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
            className="mobile-close-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation list */}
        <nav style={{
          padding: '14px 10px',
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {renderNavGroup('Earthquake Intelligence', EARTHQUAKE_MENU_ITEMS)}
          {renderNavGroup('Infrastructure Operations', INFRA_MENU_ITEMS)}
        </nav>

        {/* Footer info & Reset Demo */}
        <div style={{
          padding: '14px 16px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'rgba(7, 13, 24, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--risk-healthy)',
                boxShadow: '0 0 8px var(--risk-healthy)'
              }} />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Seismic Catalog: <strong style={{ color: '#fff' }}>1819–2026</strong>
              </span>
            </div>
          </div>

          <button
            onClick={resetToSampleData}
            title="Reset data back to factory defaults"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '6px 10px',
              fontSize: '0.72rem',
              background: 'transparent',
              color: 'var(--text-muted)',
              border: '1px dashed var(--border-subtle)',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              width: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
          >
            <RotateCcw size={12} />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </aside>
    </>
  );
};
