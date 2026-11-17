import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Menu,
  Search,
  PlusCircle,
  Bell,
  Cpu,
  Radio,
  History
} from 'lucide-react';

export const Header = () => {
  const {
    setMobileMenuOpen,
    searchQuery,
    setSearchQuery,
    setIsAddModalOpen,
    setActiveTab,
    stats
  } = useApp();

  return (
    <header className="top-header no-print">
      {/* Mobile menu button & Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, maxWidth: '520px' }}>
        <button
          onClick={() => setMobileMenuOpen(prev => !prev)}
          style={{
            display: 'none',
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            padding: '8px',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
          className="mobile-menu-trigger"
        >
          <Menu size={18} />
        </button>

        <div style={{ position: 'relative', width: '100%' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }}
          />
          <input
            type="text"
            placeholder="Search bridges, roads, expressways, states, defects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 14px 9px 40px',
              background: 'rgba(11, 19, 41, 0.7)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '9px',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--cyan-primary)';
              e.target.style.boxShadow = '0 0 0 2px rgba(6, 182, 212, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-subtle)';
              e.target.style.boxShadow = 'none';
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Live System Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          fontSize: '0.78rem',
          color: 'var(--text-secondary)'
        }}>
          <Radio size={14} color="var(--risk-healthy)" />
          <span>Real-time Telemetry: <strong style={{ color: 'var(--cyan-bright)' }}>Online</strong></span>
        </div>

        {/* Quick Alerts Bell */}
        <button
          onClick={() => setActiveTab('alerts')}
          style={{
            position: 'relative',
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            padding: '8px 10px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          title="View Alerts"
        >
          <Bell size={18} />
          {stats.activeAlerts > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: 'var(--risk-critical)',
              color: '#ffffff',
              fontSize: '0.65rem',
              fontWeight: '800',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 8px rgba(239,68,68,0.7)'
            }}>
              {stats.activeAlerts}
            </span>
          )}
        </button>

        {/* Quick Earthquake History trigger */}
        <button
          onClick={() => setActiveTab('eq-history')}
          className="btn btn-secondary btn-sm"
          style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#fca5a5' }}
          title="Explore Historical Earthquakes"
        >
          <History size={14} color="#ef4444" />
          <span>Earthquakes</span>
        </button>

        {/* Quick AI Assessment trigger */}
        <button
          onClick={() => setActiveTab('ai-risk')}
          className="btn btn-secondary btn-sm"
          title="Run New AI Assessment"
        >
          <Cpu size={15} color="var(--cyan-bright)" />
          <span>AI Assessor</span>
        </button>

        {/* Add Infrastructure Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary btn-sm"
        >
          <PlusCircle size={16} />
          <span>Add Asset</span>
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-trigger {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};
