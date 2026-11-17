import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  History,
  Search,
  Filter,
  Calendar,
  MapPin,
  Flame,
  Activity,
  Layers,
  Building,
  Route,
  GitBranch,
  ShieldAlert,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Info,
  Clock
} from 'lucide-react';

export const EarthquakeHistory = () => {
  const {
    filteredEarthquakes,
    earthquakes,
    eqSearchQuery,
    setEqSearchQuery,
    eqFilterState,
    setEqFilterState,
    eqFilterMinMag,
    setEqFilterMinMag,
    eqFilterYear,
    setEqFilterYear,
    setSelectedStateRisk,
    setActiveTab,
    dataMetadata
  } = useApp();

  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table' | 'by-state'
  const [expandedId, setExpandedId] = useState(null);

  // Quick search presets
  const quickSearches = [
    { label: 'Gujarat (Bhuj/Kutch)', term: 'Gujarat' },
    { label: 'Maharashtra (Latur/Koyna)', term: 'Maharashtra' },
    { label: 'Mumbai', term: 'Mumbai' },
    { label: 'Jammu & Kashmir', term: 'Jammu & Kashmir' },
    { label: 'Assam / NE', term: 'Assam' },
    { label: 'Delhi-NCR', term: 'Delhi' },
    { label: 'Bihar', term: 'Bihar' },
    { label: 'Uttarakhand', term: 'Uttarakhand' }
  ];

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleExportCSV = () => {
    const headers = [
      'ID', 'Name', 'Date', 'Time', 'Year', 'State', 'City', 'Epicenter',
      'Magnitude', 'Depth (km)', 'Fatalities', 'Injured', 'Buildings Damaged',
      'Roads Damaged', 'Bridges Damaged', 'Economic Loss', 'Fault Zone', 'Source'
    ];

    const rows = filteredEarthquakes.map(eq => [
      `"${eq.id}"`,
      `"${eq.name}"`,
      `"${eq.date}"`,
      `"${eq.time}"`,
      eq.year,
      `"${eq.state}"`,
      `"${eq.city}"`,
      `"${eq.epicenter}"`,
      eq.magnitude,
      eq.depth,
      eq.casualties?.fatalities || 0,
      eq.casualties?.injured || 0,
      `"${(eq.infrastructureDamage?.buildings || '').replace(/"/g, '""')}"`,
      `"${(eq.infrastructureDamage?.roads || '').replace(/"/g, '""')}"`,
      `"${(eq.infrastructureDamage?.bridges || '').replace(/"/g, '""')}"`,
      `"${(eq.estimatedEconomicLoss || '').replace(/"/g, '""')}"`,
      `"${(eq.faultZone || '').replace(/"/g, '""')}"`,
      `"${(eq.source || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `India_Historical_Earthquakes_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Group by state for 'by-state' view
  const groupedByState = filteredEarthquakes.reduce((acc, eq) => {
    acc[eq.state] = acc[eq.state] || [];
    acc[eq.state].push(eq);
    return acc;
  }, {});

  const getMagColor = (mag) => {
    if (mag >= 8.0) return '#ef4444'; // Red
    if (mag >= 7.0) return '#f97316'; // Orange
    if (mag >= 6.0) return '#f59e0b'; // Amber
    return '#06b6d4'; // Cyan
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <History color="var(--cyan-bright)" size={28} />
            Historical Earthquake Records of India
          </h1>
          <p className="page-subtitle">
            Comprehensive archive of destructive and significant earthquakes across Indian states, epicentral data, and structural damage documentation
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={handleExportCSV}
            className="btn btn-secondary btn-sm"
          >
            <Download size={15} color="var(--cyan-bright)" />
            <span>Export Catalog (CSV)</span>
          </button>

          <button
            onClick={() => setActiveTab('eq-map')}
            className="btn btn-primary btn-sm"
          >
            <MapPin size={15} />
            <span>View on Earthquake Map</span>
          </button>
        </div>
      </div>

      {/* Data Source & Scientific Notice Banner */}
      <div style={{
        padding: '12px 18px',
        borderRadius: '10px',
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <Info size={16} color="var(--cyan-bright)" />
          <span>
            Verified seismic data sourced from <strong>National Center for Seismology (NCS)</strong>, <strong>USGS</strong>, and <strong>NDMA India</strong>.
            Last catalog update: <strong style={{ color: '#f8fafc' }}>{dataMetadata.lastUpdated}</strong>.
          </span>
        </div>
        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
          Catalog Depth: <strong>1819 — Present</strong>
        </div>
      </div>

      {/* Powerful Search & Filter Suite */}
      <div className="glass-card" style={{ marginBottom: '20px', padding: '18px' }}>
        {/* Main Search Input */}
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--cyan-bright)'
            }}
          />
          <input
            type="text"
            placeholder="Search by state (Gujarat, Maharashtra...), city (Mumbai, Bhuj...), year (2001, 1993...), or magnitude..."
            className="form-control"
            style={{
              paddingLeft: '44px',
              fontSize: '0.92rem',
              background: 'rgba(11, 19, 41, 0.85)',
              borderColor: 'rgba(6, 182, 212, 0.3)'
            }}
            value={eqSearchQuery}
            onChange={(e) => setEqSearchQuery(e.target.value)}
          />
          {eqSearchQuery && (
            <button
              onClick={() => setEqSearchQuery('')}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.76rem'
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Search Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>Quick Filters:</span>
          {quickSearches.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => setEqSearchQuery(chip.term)}
              style={{
                background: eqSearchQuery === chip.term ? 'rgba(6, 182, 212, 0.25)' : 'rgba(30, 41, 59, 0.6)',
                border: eqSearchQuery === chip.term ? '1px solid var(--cyan-bright)' : '1px solid var(--border-subtle)',
                color: eqSearchQuery === chip.term ? '#ffffff' : 'var(--text-secondary)',
                padding: '3px 10px',
                borderRadius: '6px',
                fontSize: '0.74rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {chip.label}
            </button>
          ))}
          {eqSearchQuery && (
            <button
              onClick={() => setEqSearchQuery('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--cyan-bright)',
                fontSize: '0.74rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Reset Search
            </button>
          )}
        </div>

        {/* Advanced Filters & View Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* State Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <Filter size={14} color="var(--cyan-bright)" />
              <span>State:</span>
              <select
                className="form-control"
                style={{ padding: '4px 10px', fontSize: '0.78rem', width: 'auto' }}
                value={eqFilterState}
                onChange={(e) => setEqFilterState(e.target.value)}
              >
                <option value="All">All Indian States</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                <option value="Delhi">Delhi-NCR</option>
                <option value="Assam">Assam</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Bihar">Bihar</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
              </select>
            </div>

            {/* Magnitude Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span>Min Magnitude:</span>
              <select
                className="form-control"
                style={{ padding: '4px 10px', fontSize: '0.78rem', width: 'auto' }}
                value={eqFilterMinMag}
                onChange={(e) => setEqFilterMinMag(e.target.value)}
              >
                <option value="All">All Magnitudes</option>
                <option value="8.0+">M 8.0+ (Great Earthquakes)</option>
                <option value="7.0+">M 7.0+ (Major Earthquakes)</option>
                <option value="6.0+">M 6.0+ (Strong Earthquakes)</option>
                <option value="5.0+">M 5.0+ (Moderate)</option>
              </select>
            </div>

            {/* Era / Year Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <Calendar size={14} />
              <span>Era:</span>
              <select
                className="form-control"
                style={{ padding: '4px 10px', fontSize: '0.78rem', width: 'auto' }}
                value={eqFilterYear}
                onChange={(e) => setEqFilterYear(e.target.value)}
              >
                <option value="All">All Years (1819 - Present)</option>
                <option value="post-2000">2000 - Present (Modern Era)</option>
                <option value="1950-1999">1950 - 1999 (Post-Independence)</option>
                <option value="pre-1950">Pre-1950 (Historical)</option>
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.7)',
            padding: '3px',
            borderRadius: '8px',
            display: 'flex',
            gap: '2px',
            border: '1px solid var(--border-subtle)'
          }}>
            <button
              onClick={() => setViewMode('cards')}
              style={{
                background: viewMode === 'cards' ? 'rgba(6, 182, 212, 0.25)' : 'transparent',
                color: viewMode === 'cards' ? '#fff' : 'var(--text-muted)',
                fontWeight: viewMode === 'cards' ? '700' : '500',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              Detailed Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              style={{
                background: viewMode === 'table' ? 'rgba(6, 182, 212, 0.25)' : 'transparent',
                color: viewMode === 'table' ? '#fff' : 'var(--text-muted)',
                fontWeight: viewMode === 'table' ? '700' : '500',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              Data Table
            </button>
            <button
              onClick={() => setViewMode('by-state')}
              style={{
                background: viewMode === 'by-state' ? 'rgba(6, 182, 212, 0.25)' : 'transparent',
                color: viewMode === 'by-state' ? '#fff' : 'var(--text-muted)',
                fontWeight: viewMode === 'by-state' ? '700' : '500',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              State-Wise
            </button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
          Displaying <strong>{filteredEarthquakes.length}</strong> verified earthquake events
          {eqSearchQuery && <span> matching query "<strong style={{ color: 'var(--cyan-bright)' }}>{eqSearchQuery}</strong>"</span>}
        </div>
      </div>

      {/* VIEW 1: DETAILED CARDS */}
      {viewMode === 'cards' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredEarthquakes.length === 0 ? (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Activity size={36} color="var(--cyan-bright)" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontSize: '1rem', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>No Earthquake Records Found</div>
              <p style={{ fontSize: '0.82rem' }}>Try adjusting your state, city name, or magnitude filters.</p>
            </div>
          ) : (
            filteredEarthquakes.map(eq => {
              const isExpanded = expandedId === eq.id;
              const magColor = getMagColor(eq.magnitude);

              return (
                <div
                  key={eq.id}
                  className="glass-card"
                  style={{
                    borderLeft: `4px solid ${magColor}`,
                    transition: 'all 0.2s ease',
                    padding: '20px'
                  }}
                >
                  {/* Top Bar: Title, Magnitude Badge, Date, Location */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      {/* Big Magnitude Stamp */}
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '12px',
                        background: `${magColor}22`,
                        border: `1.5px solid ${magColor}55`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: '900', color: magColor, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                          {eq.magnitude}
                        </div>
                        <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '2px' }}>
                          {eq.magnitudeType}
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#f8fafc' }}>
                            {eq.name}
                          </h3>
                          <span className="badge-pill" style={{ color: 'var(--cyan-bright)' }}>{eq.year}</span>
                          <span className="badge-pill" style={{ color: '#fff' }}>Intensity: {eq.intensity}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', flexWrap: 'wrap' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={13} color="var(--cyan-bright)" />
                            <strong>{eq.city}</strong>, {eq.state}
                          </span>
                          <span>•</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={13} />
                            {eq.date} ({eq.time})
                          </span>
                          <span>•</span>
                          <span>Depth: <strong>{eq.depth} km</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => {
                          setSelectedStateRisk(eq.state);
                          setActiveTab('eq-risk');
                        }}
                        className="btn btn-outline btn-sm"
                        style={{ fontSize: '0.74rem', padding: '5px 10px' }}
                      >
                        <span>Seismic Hazard Profile</span>
                      </button>

                      <button
                        onClick={() => toggleExpand(eq.id)}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '0.74rem', padding: '5px 10px' }}
                      >
                        <span>{isExpanded ? 'Less' : 'Damage Details'}</span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Casualty & Economic Summary Bar */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '10px',
                    background: 'rgba(11, 19, 41, 0.65)',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginTop: '16px',
                    fontSize: '0.78rem'
                  }}>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Reported Fatalities</div>
                      <div style={{ fontSize: '1rem', fontWeight: '800', color: eq.casualties?.fatalities > 1000 ? '#ef4444' : '#f59e0b', fontFamily: 'var(--font-mono)' }}>
                        {eq.casualties?.fatalities ? eq.casualties.fatalities.toLocaleString('en-IN') : 'N/A'}
                      </div>
                    </div>

                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Injuries / Displaced</div>
                      <div style={{ fontSize: '1rem', fontWeight: '800', color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                        {eq.casualties?.injured ? eq.casualties.injured.toLocaleString('en-IN') : 'N/A'}
                      </div>
                    </div>

                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Estimated Economic Loss</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--cyan-bright)' }}>
                        {eq.estimatedEconomicLoss}
                      </div>
                    </div>

                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Primary Fault System</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#cbd5e1' }}>
                        {eq.faultZone}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Deep Damage & Structural Report */}
                  {isExpanded && (
                    <div style={{
                      marginTop: '16px',
                      paddingTop: '16px',
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px'
                    }}>
                      <div style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--cyan-bright)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Detailed Infrastructure Damage Analysis (Post-Disaster Survey)
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                        {/* Buildings */}
                        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '0.82rem', color: '#f87171', marginBottom: '6px' }}>
                            <Building size={14} />
                            <span>Building & Structural Collapses</span>
                          </div>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            {eq.infrastructureDamage?.buildings}
                          </p>
                        </div>

                        {/* Roads */}
                        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '0.82rem', color: '#fb923c', marginBottom: '6px' }}>
                            <Route size={14} />
                            <span>Roads, Highways & Embankments</span>
                          </div>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            {eq.infrastructureDamage?.roads}
                          </p>
                        </div>

                        {/* Bridges */}
                        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '0.82rem', color: 'var(--cyan-bright)', marginBottom: '6px' }}>
                            <GitBranch size={14} />
                            <span>Bridges, Viaducts & River Spans</span>
                          </div>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            {eq.infrastructureDamage?.bridges}
                          </p>
                        </div>

                        {/* Other Infrastructure */}
                        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>
                            <ShieldAlert size={14} />
                            <span>Utilities, Ports & Heritage Damage</span>
                          </div>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            {eq.infrastructureDamage?.other}
                          </p>
                        </div>
                      </div>

                      {/* Geological & Data Source Footnote */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '10px',
                        background: 'rgba(11, 19, 41, 0.4)',
                        padding: '10px 14px',
                        borderRadius: '6px',
                        fontSize: '0.74rem',
                        color: 'var(--text-muted)'
                      }}>
                        <div>
                          <span>Subsurface / Soil Condition: </span>
                          <strong style={{ color: '#cbd5e1' }}>{eq.soilCondition}</strong>
                        </div>
                        <div>
                          <span>Archival Source: </span>
                          <strong style={{ color: 'var(--cyan-bright)' }}>{eq.source}</strong>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* VIEW 2: DATA TABLE */}
      {viewMode === 'table' && (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Magnitude</th>
                <th>Earthquake Name</th>
                <th>State & Location</th>
                <th>Exact Date</th>
                <th>Depth</th>
                <th>Casualties</th>
                <th>Estimated Economic Loss</th>
                <th>Primary Source</th>
              </tr>
            </thead>
            <tbody>
              {filteredEarthquakes.map(eq => {
                const magColor = getMagColor(eq.magnitude);

                return (
                  <tr key={eq.id}>
                    <td>
                      <span style={{
                        display: 'inline-block',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        fontWeight: '800',
                        background: `${magColor}22`,
                        color: magColor,
                        fontFamily: 'var(--font-mono)'
                      }}>
                        M {eq.magnitude}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: '700', color: '#fff' }}>{eq.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Fault: {eq.faultZone}</div>
                    </td>
                    <td>
                      <div style={{ color: 'var(--text-primary)' }}>{eq.city}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{eq.state}</div>
                    </td>
                    <td style={{ fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                      {eq.date}
                    </td>
                    <td style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                      {eq.depth} km
                    </td>
                    <td>
                      <div style={{ fontWeight: '700', color: eq.casualties?.fatalities > 1000 ? '#ef4444' : '#f8fafc' }}>
                        {eq.casualties?.fatalities ? eq.casualties.fatalities.toLocaleString('en-IN') : 'N/A'} dead
                      </div>
                    </td>
                    <td style={{ fontSize: '0.76rem', color: 'var(--cyan-bright)' }}>
                      {eq.estimatedEconomicLoss}
                    </td>
                    <td style={{ fontSize: '0.72rem', color: 'var(--text-muted)', maxWidth: '200px' }}>
                      {eq.source}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW 3: BY STATE */}
      {viewMode === 'by-state' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {Object.keys(groupedByState).map(stateName => (
            <div key={stateName} className="glass-card" style={{ padding: '18px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '12px',
                marginBottom: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MapPin size={18} color="var(--cyan-bright)" />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff' }}>
                    {stateName}
                  </h3>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span className="badge-pill">{groupedByState[stateName].length} Historical Records</span>
                  <button
                    onClick={() => {
                      setSelectedStateRisk(stateName);
                      setActiveTab('eq-risk');
                    }}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                  >
                    View Hazard Profile &rarr;
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '12px' }}>
                {groupedByState[stateName].map(eq => {
                  const magColor = getMagColor(eq.magnitude);

                  return (
                    <div
                      key={eq.id}
                      style={{
                        background: 'rgba(11, 19, 41, 0.7)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        padding: '14px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: '700', fontSize: '0.92rem', color: '#fff' }}>
                          {eq.name}
                        </span>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontWeight: '800',
                          fontSize: '0.8rem',
                          background: `${magColor}22`,
                          color: magColor,
                          fontFamily: 'var(--font-mono)'
                        }}>
                          M {eq.magnitude}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        Date: <strong>{eq.date}</strong> • Depth: <strong>{eq.depth} km</strong> • Epicenter: {eq.epicenter}
                      </div>

                      <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', background: 'rgba(15, 23, 42, 0.6)', padding: '6px 8px', borderRadius: '4px' }}>
                        <strong>Infrastructure Impact: </strong>
                        {eq.infrastructureDamage?.buildings || 'Documented structural damage.'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
