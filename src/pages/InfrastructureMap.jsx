import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Filter,
  Layers,
  Activity,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Info,
  Maximize2,
  Grid
} from 'lucide-react';
import L from 'leaflet';

export const InfrastructureMap = () => {
  const {
    infrastructure,
    setSelectedInfra,
    searchQuery,
    filterType,
    setFilterType,
    filterRisk,
    setFilterRisk
  } = useApp();

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  const [mapError, setMapError] = useState(false);
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'grid'

  // Filter infrastructure based on type, risk, and global search query
  const filteredAssets = infrastructure.filter(item => {
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === 'All' || item.type === filterType;
    const matchesRisk = filterRisk === 'All' || item.riskCategory === filterRisk;

    return matchesSearch && matchesType && matchesRisk;
  });

  // Marker pin color resolver
  const getMarkerColor = (category) => {
    switch (category) {
      case 'Critical Risk': return '#ef4444'; // Red
      case 'High Risk': return '#f97316';     // Orange
      case 'Moderate Risk': return '#f59e0b'; // Yellow
      default: return '#10b981';              // Green
    }
  };

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (viewMode !== 'map') return;

    try {
      if (!mapInstanceRef.current && mapContainerRef.current) {
        // Center of India coordinates: ~21.5° N, 82.0° E
        const map = L.map(mapContainerRef.current, {
          center: [22.5, 82.0],
          zoom: 5,
          minZoom: 4,
          maxZoom: 14,
          zoomControl: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors | InfraGuard AI',
          maxZoom: 18
        }).addTo(map);

        const markersLayer = L.layerGroup().addTo(map);
        markersLayerRef.current = markersLayer;
        mapInstanceRef.current = map;
      }
    } catch (err) {
      console.error('Failed to initialize Leaflet Map:', err);
      setMapError(true);
    }

    return () => {
      // Don't necessarily destroy on every small state update, will cleanup when component unmounts
    };
  }, [viewMode]);

  // Update markers when filteredAssets change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    filteredAssets.forEach(asset => {
      if (!asset.coordinates || asset.coordinates.length !== 2) return;

      const [lat, lng] = asset.coordinates;
      const color = getMarkerColor(asset.riskCategory);

      // Custom styled HTML marker
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            position: relative;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              position: absolute;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: ${color};
              opacity: 0.35;
              animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></div>
            <div style="
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: ${color};
              border: 2px solid #ffffff;
              box-shadow: 0 0 10px ${color};
            "></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      // Interactive popup
      const popupContent = document.createElement('div');
      popupContent.style.minWidth = '220px';
      popupContent.style.padding = '4px';
      popupContent.innerHTML = `
        <div style="font-weight: 800; font-size: 0.92rem; color: #f8fafc; margin-bottom: 2px;">
          ${asset.name}
        </div>
        <div style="font-size: 0.74rem; color: #94a3b8; margin-bottom: 8px;">
          ${asset.city}, ${asset.state} • ${asset.type}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(30, 41, 59, 0.7); padding: 6px 8px; border-radius: 6px; margin-bottom: 8px;">
          <span style="font-size: 0.72rem; color: #cbd5e1;">Risk: <strong style="color: ${color};">${asset.riskCategory}</strong></span>
          <span style="font-size: 0.72rem; color: #cbd5e1;">Health: <strong style="color: #38bdf8;">${asset.healthScore}/100</strong></span>
        </div>
        <div style="font-size: 0.72rem; color: #94a3b8; margin-bottom: 8px;">
          Vibration: <strong>${asset.vibrationLevel} mm/s</strong> | Crack: <strong>${asset.crackMeasurement} mm</strong>
        </div>
        <button id="view-details-${asset.id}" style="
          width: 100%;
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          border: none;
          color: #ffffff;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
        ">View Detailed Telemetry &rarr;</button>
      `;

      marker.bindPopup(popupContent);
      marker.on('popupopen', () => {
        const btn = document.getElementById(`view-details-${asset.id}`);
        if (btn) {
          btn.onclick = () => setSelectedInfra(asset);
        }
      });

      markersLayerRef.current.addLayer(marker);
    });
  }, [filteredAssets, setSelectedInfra]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Group by Indian State for Grid/Fallback view
  const assetsByState = filteredAssets.reduce((acc, curr) => {
    acc[curr.state] = acc[curr.state] || [];
    acc[curr.state].push(curr);
    return acc;
  }, {});

  return (
    <div className="page-wrapper">
      {/* Header and View Controls */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <MapPin color="var(--cyan-bright)" size={28} />
            National Infrastructure Map (India)
          </h1>
          <p className="page-subtitle">
            Geospatial IoT risk distribution across Indian states with real-time severity status markers
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* View Toggle */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '3px',
            display: 'flex',
            gap: '2px'
          }}>
            <button
              onClick={() => setViewMode('map')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 10px',
                borderRadius: '6px',
                border: 'none',
                background: viewMode === 'map' ? 'rgba(6, 182, 212, 0.25)' : 'transparent',
                color: viewMode === 'map' ? '#fff' : 'var(--text-muted)',
                fontWeight: viewMode === 'map' ? '700' : '500',
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              <MapPin size={14} />
              <span>Map View</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 10px',
                borderRadius: '6px',
                border: 'none',
                background: viewMode === 'grid' ? 'rgba(6, 182, 212, 0.25)' : 'transparent',
                color: viewMode === 'grid' ? '#fff' : 'var(--text-muted)',
                fontWeight: viewMode === 'grid' ? '700' : '500',
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              <Grid size={14} />
              <span>State Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Legend Bar */}
      <div className="glass-card" style={{ marginBottom: '16px', padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          {/* Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <Filter size={14} color="var(--cyan-bright)" />
              <span>Type:</span>
              <select
                className="form-control"
                style={{ padding: '4px 8px', fontSize: '0.78rem', width: 'auto' }}
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
              >
                <option value="All">All Assets</option>
                <option value="Bridge">Bridges</option>
                <option value="Road">Roads / Highways</option>
                <option value="Building">Buildings</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span>Risk Severity:</span>
              <select
                className="form-control"
                style={{ padding: '4px 8px', fontSize: '0.78rem', width: 'auto' }}
                value={filterRisk}
                onChange={e => setFilterRisk(e.target.value)}
              >
                <option value="All">All Severity Levels</option>
                <option value="Low Risk">Healthy (0-25)</option>
                <option value="Moderate Risk">Moderate (26-50)</option>
                <option value="High Risk">High Risk (51-75)</option>
                <option value="Critical Risk">Critical (76-100)</option>
              </select>
            </div>

            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Showing <strong>{filteredAssets.length}</strong> of <strong>{infrastructure.length}</strong> facilities
            </span>
          </div>

          {/* Color Pin Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
              <span>Healthy</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 6px #f59e0b' }} />
              <span>Moderate</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f97316', boxShadow: '0 0 6px #f97316' }} />
              <span>High Risk</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 6px #ef4444' }} />
              <span>Critical</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Map or Fallback State Grid */}
      {viewMode === 'map' && !mapError ? (
        <div className="glass-card" style={{ padding: '8px', height: '620px', position: 'relative' }}>
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%', borderRadius: '10px' }} />

          {/* Floating Map Info Overlay */}
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            background: 'rgba(11, 19, 41, 0.88)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            backdropFilter: 'blur(8px)',
            maxWidth: '300px',
            zIndex: 1000
          }}>
            <div style={{ fontWeight: '700', color: '#fff', marginBottom: '4px' }}>Interactive Indian Subcontinent Grid</div>
            Click on any sensor pin to inspect real-time vibration, crack propagation, and structural health telemetry.
          </div>
        </div>
      ) : (
        /* State Location Dashboard (Fallback or Alternative View) */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {mapError && (
            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#fca5a5',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Info size={16} />
              <span>Map rendering engine encountered offline boundary. Presenting the integrated India State Location Dashboard fallback.</span>
            </div>
          )}

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px'
          }}>
            {Object.keys(assetsByState).map(stateName => (
              <div key={stateName} className="glass-card" style={{ padding: '16px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '10px',
                  marginBottom: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '0.95rem' }}>
                    <MapPin size={16} color="var(--cyan-bright)" />
                    <span>{stateName}</span>
                  </div>
                  <span className="badge-pill">{assetsByState[stateName].length} Monitored</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {assetsByState[stateName].map(asset => {
                    const color = getMarkerColor(asset.riskCategory);
                    return (
                      <div
                        key={asset.id}
                        onClick={() => setSelectedInfra(asset)}
                        className="glass-card-hover"
                        style={{
                          padding: '10px 12px',
                          borderRadius: '8px',
                          background: 'rgba(11, 19, 41, 0.7)',
                          border: `1px solid ${color}33`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.84rem', fontWeight: '700', color: '#f8fafc' }}>
                            {asset.name}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            {asset.city} • {asset.subType}
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '0.68rem',
                            fontWeight: '700',
                            background: `${color}22`,
                            color: color,
                            border: `1px solid ${color}55`
                          }}>
                            {asset.riskCategory}
                          </span>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                            Health: {asset.healthScore}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
