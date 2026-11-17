import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Filter,
  Calendar,
  Layers,
  Activity,
  Flame,
  Info,
  Maximize2,
  Grid,
  Radio,
  Sliders
} from 'lucide-react';
import L from 'leaflet';

export const EarthquakeMap = () => {
  const {
    earthquakes,
    eqFilterState,
    setEqFilterState,
    setSelectedStateRisk,
    setActiveTab
  } = useApp();

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const faultLinesLayerRef = useRef(null);

  const [mapError, setMapError] = useState(false);
  const [selectedMagRange, setSelectedMagRange] = useState('All');
  const [selectedYearRange, setSelectedYearRange] = useState('All');
  const [showFaultLines, setShowFaultLines] = useState(true);
  const [viewMode, setViewMode] = useState('map'); // 'map' | 'grid'

  // Filtered dataset for map
  const mapEarthquakes = earthquakes.filter(eq => {
    // State filter
    const matchesState = eqFilterState === 'All' || eq.state.toLowerCase().includes(eqFilterState.toLowerCase());

    // Magnitude range filter
    let matchesMag = true;
    if (selectedMagRange === '8.0+') matchesMag = eq.magnitude >= 8.0;
    else if (selectedMagRange === '7.0-7.9') matchesMag = eq.magnitude >= 7.0 && eq.magnitude < 8.0;
    else if (selectedMagRange === '6.0-6.9') matchesMag = eq.magnitude >= 6.0 && eq.magnitude < 7.0;
    else if (selectedMagRange === '5.0-5.9') matchesMag = eq.magnitude >= 5.0 && eq.magnitude < 6.0;

    // Year range filter
    let matchesYear = true;
    if (selectedYearRange === '2000+') matchesYear = eq.year >= 2000;
    else if (selectedYearRange === '1950-1999') matchesYear = eq.year >= 1950 && eq.year < 2000;
    else if (selectedYearRange === 'pre-1950') matchesYear = eq.year < 1950;

    return matchesState && matchesMag && matchesYear;
  });

  const getMarkerColor = (mag) => {
    if (mag >= 8.0) return '#ef4444'; // Red (Great)
    if (mag >= 7.0) return '#f97316'; // Orange (Major)
    if (mag >= 6.0) return '#f59e0b'; // Amber (Strong)
    return '#06b6d4'; // Cyan (Moderate)
  };

  // Major Indian Tectonic Fault Line Polyline Coordinates (Scientific GSI reference)
  const TECTONIC_FAULTS = [
    {
      name: "Main Himalayan Thrust (MHT / MBT Front)",
      coords: [
        [34.8, 73.2], [34.0, 74.8], [32.5, 76.5], [30.8, 78.5],
        [29.5, 80.5], [28.2, 83.5], [27.3, 87.0], [26.8, 89.5],
        [27.0, 92.5], [28.0, 95.5], [28.4, 96.8]
      ],
      color: "#ef4444"
    },
    {
      name: "Kutch Mainland Fault (KMF) & Allah Bund Zone",
      coords: [
        [23.7, 68.5], [23.5, 69.5], [23.4, 70.3], [23.3, 71.2]
      ],
      color: "#f97316"
    },
    {
      name: "Narmada-Son Lineament (NSL Intraplate Fault)",
      coords: [
        [21.6, 72.8], [22.0, 75.5], [22.8, 78.5], [23.2, 81.0], [24.0, 84.5], [25.0, 87.5]
      ],
      color: "#f59e0b"
    },
    {
      name: "Western Continental Margin / Panvel Flexure",
      coords: [
        [19.8, 72.9], [19.0, 72.8], [18.2, 73.1], [17.3, 73.4], [16.5, 73.5]
      ],
      color: "#06b6d4"
    },
    {
      name: "Dauki & Kopili Faults (Northeast India)",
      coords: [
        [25.2, 90.5], [25.1, 92.0], [25.8, 93.0], [26.5, 93.8]
      ],
      color: "#ec4899"
    }
  ];

  // Initialize Map
  useEffect(() => {
    if (viewMode !== 'map') return;

    try {
      if (!mapInstanceRef.current && mapContainerRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [23.0, 82.0],
          zoom: 5,
          minZoom: 4,
          maxZoom: 14,
          zoomControl: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap | National Center for Seismology (NCS)',
          maxZoom: 18
        }).addTo(map);

        const faultLinesLayer = L.layerGroup().addTo(map);
        const markersLayer = L.layerGroup().addTo(map);

        faultLinesLayerRef.current = faultLinesLayer;
        markersLayerRef.current = markersLayer;
        mapInstanceRef.current = map;
      }
    } catch (err) {
      console.error('Leaflet initialization error:', err);
      setMapError(true);
    }
  }, [viewMode]);

  // Update Tectonic Fault Lines
  useEffect(() => {
    if (!faultLinesLayerRef.current) return;
    faultLinesLayerRef.current.clearLayers();

    if (showFaultLines) {
      TECTONIC_FAULTS.forEach(fault => {
        const polyline = L.polyline(fault.coords, {
          color: fault.color,
          weight: 3,
          dashArray: '6, 6',
          opacity: 0.75
        });

        polyline.bindTooltip(`Tectonic Zone: ${fault.name}`, { sticky: true });
        faultLinesLayerRef.current.addLayer(polyline);
      });
    }
  }, [showFaultLines]);

  // Update Markers when mapEarthquakes changes
  useEffect(() => {
    if (!markersLayerRef.current) return;
    markersLayerRef.current.clearLayers();

    mapEarthquakes.forEach(eq => {
      if (!eq.coordinates || eq.coordinates.length !== 2) return;
      const [lat, lng] = eq.coordinates;
      const color = getMarkerColor(eq.magnitude);

      // Marker radius scaled by magnitude
      const markerSize = Math.max(22, Math.round(eq.magnitude * 4.2));

      const customIcon = L.divIcon({
        className: 'custom-eq-marker',
        html: `
          <div style="
            position: relative;
            width: ${markerSize}px;
            height: ${markerSize}px;
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
              width: ${markerSize - 8}px;
              height: ${markerSize - 8}px;
              border-radius: 50%;
              background: ${color};
              border: 2px solid #ffffff;
              box-shadow: 0 0 12px ${color};
              display: flex;
              align-items: center;
              justify-content: center;
              color: #ffffff;
              font-size: 10px;
              font-weight: 800;
              font-family: monospace;
            ">
              ${eq.magnitude}
            </div>
          </div>
        `,
        iconSize: [markerSize, markerSize],
        iconAnchor: [markerSize / 2, markerSize / 2],
        popupAnchor: [0, -markerSize / 2]
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      // Popup Content
      const popupHtml = `
        <div style="min-width: 240px; padding: 4px; font-family: sans-serif;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
            <strong style="font-size: 1rem; color: #f8fafc;">${eq.name}</strong>
            <span style="background: ${color}33; color: ${color}; border: 1px solid ${color}66; padding: 1px 6px; border-radius: 4px; font-weight: 800; font-size: 0.76rem;">
              M ${eq.magnitude}
            </span>
          </div>

          <div style="font-size: 0.74rem; color: #94a3b8; margin-bottom: 8px;">
            ${eq.city}, ${eq.state} • ${eq.date} (${eq.time})
          </div>

          <div style="background: rgba(30, 41, 59, 0.7); padding: 6px 8px; border-radius: 6px; font-size: 0.72rem; margin-bottom: 8px; color: #cbd5e1;">
            <div>Focal Depth: <strong>${eq.depth} km</strong> | Intensity: <strong>${eq.intensity}</strong></div>
            <div>Fatalities: <strong style="color: #ef4444;">${eq.casualties?.fatalities ? eq.casualties.fatalities.toLocaleString('en-IN') : 'N/A'}</strong></div>
            <div>Loss: <strong>${eq.estimatedEconomicLoss}</strong></div>
          </div>

          <div style="font-size: 0.72rem; color: #94a3b8; margin-bottom: 6px; line-height: 1.4;">
            <strong>Infrastructure Impact:</strong><br/>
            ${eq.infrastructureDamage?.buildings || 'Documented masonry damage.'}
          </div>

          <div style="font-size: 0.68rem; color: #64748b; border-top: 1px dashed rgba(148, 163, 184, 0.2); padding-top: 4px;">
            Source: ${eq.source}
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      markersLayerRef.current.addLayer(marker);
    });
  }, [mapEarthquakes]);

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <MapPin color="var(--cyan-bright)" size={28} />
            Interactive National Earthquake Map (India)
          </h1>
          <p className="page-subtitle">
            Geospatial distribution of historical earthquake epicenters, focal depths, tectonic fault line systems, and reported damage
          </p>
        </div>

        {/* View mode toggle */}
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
              padding: '5px 12px',
              borderRadius: '6px',
              border: 'none',
              background: viewMode === 'map' ? 'rgba(6, 182, 212, 0.25)' : 'transparent',
              color: viewMode === 'map' ? '#fff' : 'var(--text-muted)',
              fontWeight: viewMode === 'map' ? '700' : '500',
              fontSize: '0.78rem',
              cursor: 'pointer'
            }}
          >
            Interactive Map
          </button>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              padding: '5px 12px',
              borderRadius: '6px',
              border: 'none',
              background: viewMode === 'grid' ? 'rgba(6, 182, 212, 0.25)' : 'transparent',
              color: viewMode === 'grid' ? '#fff' : 'var(--text-muted)',
              fontWeight: viewMode === 'grid' ? '700' : '500',
              fontSize: '0.78rem',
              cursor: 'pointer'
            }}
          >
            State Epicenter Grid
          </button>
        </div>
      </div>

      {/* Filter and Legend Bar */}
      <div className="glass-card" style={{ marginBottom: '16px', padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          {/* Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* State filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <Filter size={14} color="var(--cyan-bright)" />
              <span>State:</span>
              <select
                className="form-control"
                style={{ padding: '4px 10px', fontSize: '0.78rem', width: 'auto' }}
                value={eqFilterState}
                onChange={(e) => setEqFilterState(e.target.value)}
              >
                <option value="All">All States ({earthquakes.length} Events)</option>
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

            {/* Magnitude Range */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span>Magnitude:</span>
              <select
                className="form-control"
                style={{ padding: '4px 10px', fontSize: '0.78rem', width: 'auto' }}
                value={selectedMagRange}
                onChange={(e) => setSelectedMagRange(e.target.value)}
              >
                <option value="All">All Magnitudes</option>
                <option value="8.0+">M 8.0+ (Great)</option>
                <option value="7.0-7.9">M 7.0 - 7.9 (Major)</option>
                <option value="6.0-6.9">M 6.0 - 6.9 (Strong)</option>
                <option value="5.0-5.9">M 5.0 - 5.9 (Moderate)</option>
              </select>
            </div>

            {/* Year Range */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <Calendar size={14} />
              <span>Period:</span>
              <select
                className="form-control"
                style={{ padding: '4px 10px', fontSize: '0.78rem', width: 'auto' }}
                value={selectedYearRange}
                onChange={(e) => setSelectedYearRange(e.target.value)}
              >
                <option value="All">All Historical Years</option>
                <option value="2000+">2000 - Present</option>
                <option value="1950-1999">1950 - 1999</option>
                <option value="pre-1950">Pre-1950</option>
              </select>
            </div>

            {/* Fault Lines Toggle */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--cyan-bright)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={showFaultLines}
                onChange={(e) => setShowFaultLines(e.target.checked)}
                style={{ accentColor: 'var(--cyan-primary)' }}
              />
              <span>Tectonic Fault Overlay</span>
            </label>
          </div>

          {/* Color Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.74rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 6px #ef4444' }} />
              <span>M 8.0+ (Great)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f97316', boxShadow: '0 0 6px #f97316' }} />
              <span>M 7.0 - 7.9</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 6px #f59e0b' }} />
              <span>M 6.0 - 6.9</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#06b6d4', boxShadow: '0 0 6px #06b6d4' }} />
              <span>M 5.0 - 5.9</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Map or State Grid View */}
      {viewMode === 'map' && !mapError ? (
        <div className="glass-card" style={{ padding: '8px', height: '640px', position: 'relative' }}>
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%', borderRadius: '10px' }} />

          {/* Floating Map Legend Card */}
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            background: 'rgba(11, 19, 41, 0.92)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '0.74rem',
            color: 'var(--text-secondary)',
            backdropFilter: 'blur(8px)',
            maxWidth: '320px',
            zIndex: 1000
          }}>
            <div style={{ fontWeight: '800', color: '#fff', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Radio size={14} color="var(--cyan-bright)" />
              <span>Indian Subcontinent Seismotectonic Map</span>
            </div>
            Dashed lines represent major active fault systems (Main Himalayan Thrust, Kutch Faults, Narmada Lineament, Panvel Flexure). Click markers to read reported damage.
          </div>
        </div>
      ) : (
        /* State Grid Fallback */
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '16px'
        }}>
          {mapEarthquakes.map(eq => {
            const color = getMarkerColor(eq.magnitude);

            return (
              <div
                key={eq.id}
                className="glass-card"
                style={{
                  borderLeft: `4px solid ${color}`,
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '0.96rem', color: '#fff' }}>{eq.name}</strong>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: '800',
                    fontSize: '0.8rem',
                    background: `${color}22`,
                    color: color,
                    fontFamily: 'var(--font-mono)'
                  }}>
                    M {eq.magnitude}
                  </span>
                </div>

                <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                  <MapPin size={12} color="var(--cyan-bright)" style={{ display: 'inline', marginRight: '4px' }} />
                  {eq.city}, {eq.state} ({eq.date})
                </div>

                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Focal Depth: <strong>{eq.depth} km</strong> • Intensity: <strong>{eq.intensity}</strong>
                </div>

                <div style={{
                  fontSize: '0.76rem',
                  color: 'var(--text-secondary)',
                  background: 'rgba(11, 19, 41, 0.6)',
                  padding: '8px',
                  borderRadius: '6px'
                }}>
                  {eq.infrastructureDamage?.buildings || 'Damage recorded.'}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
