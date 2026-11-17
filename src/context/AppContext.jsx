import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_INFRASTRUCTURE, INITIAL_ALERTS, MAINTENANCE_CATALOG } from '../data/mockData';
import { calculateRiskScore } from '../utils/riskEngine';
import { HISTORICAL_EARTHQUAKES, STATE_SEISMIC_PROFILES, DATA_METADATA } from '../data/earthquakeData';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  INFRASTRUCTURE: 'infraguard_infrastructure_v1',
  ALERTS: 'infraguard_alerts_v1',
  ASSESSMENTS: 'infraguard_assessments_v1'
};

export const AppProvider = ({ children }) => {
  // Navigation & UI State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedInfra, setSelectedInfra] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Infrastructure Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterRisk, setFilterRisk] = useState('All');

  // Earthquake Intelligence States
  const [earthquakes] = useState(HISTORICAL_EARTHQUAKES);
  const [selectedEarthquake, setSelectedEarthquake] = useState(null);
  const [eqSearchQuery, setEqSearchQuery] = useState('');
  const [eqFilterState, setEqFilterState] = useState('All');
  const [eqFilterMinMag, setEqFilterMinMag] = useState('All');
  const [eqFilterYear, setEqFilterYear] = useState('All');
  const [selectedStateRisk, setSelectedStateRisk] = useState('Gujarat');
  const [compareStates, setCompareStates] = useState(['Gujarat', 'Maharashtra']);

  // Core Data with LocalStorage Persistence
  const [infrastructure, setInfrastructure] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INFRASTRUCTURE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed reading infrastructure from localStorage:', e);
    }
    return INITIAL_INFRASTRUCTURE;
  });

  const [alerts, setAlerts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ALERTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed reading alerts from localStorage:', e);
    }
    return INITIAL_ALERTS;
  });

  const [assessments, setAssessments] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed reading assessments from localStorage:', e);
    }
    return [];
  });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INFRASTRUCTURE, JSON.stringify(infrastructure));
    } catch (e) {
      console.error('Error saving infrastructure to localStorage:', e);
    }
  }, [infrastructure]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(alerts));
    } catch (e) {
      console.error('Error saving alerts to localStorage:', e);
    }
  }, [alerts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(assessments));
    } catch (e) {
      console.error('Error saving assessments to localStorage:', e);
    }
  }, [assessments]);

  // Statistics calculation
  const stats = React.useMemo(() => {
    const total = infrastructure.length;
    const healthy = infrastructure.filter(i => i.riskCategory === 'Low Risk').length;
    const moderate = infrastructure.filter(i => i.riskCategory === 'Moderate Risk').length;
    const high = infrastructure.filter(i => i.riskCategory === 'High Risk').length;
    const critical = infrastructure.filter(i => i.riskCategory === 'Critical Risk').length;

    const bridges = infrastructure.filter(i => i.type === 'Bridge').length;
    const roads = infrastructure.filter(i => i.type === 'Road').length;
    const buildings = infrastructure.filter(i => i.type === 'Building').length;

    const avgHealth = total > 0 
      ? Math.round(infrastructure.reduce((acc, curr) => acc + (curr.healthScore || 0), 0) / total)
      : 0;

    const activeAlerts = alerts.filter(a => a.status !== 'Resolved').length;

    // Earthquake Stats
    const totalEarthquakes = earthquakes.length;
    const majorEarthquakes = earthquakes.filter(e => e.magnitude >= 7.0).length;
    const statesImpacted = Object.keys(STATE_SEISMIC_PROFILES).length;

    return {
      total,
      healthy,
      moderate,
      high,
      critical,
      bridges,
      roads,
      buildings,
      avgHealth,
      activeAlerts,
      totalEarthquakes,
      majorEarthquakes,
      statesImpacted
    };
  }, [infrastructure, alerts, earthquakes]);

  // Filtered Earthquakes dynamically computed
  const filteredEarthquakes = React.useMemo(() => {
    return earthquakes.filter(eq => {
      // Search by state, city/location, year, magnitude string
      const searchLower = eqSearchQuery.trim().toLowerCase();
      const matchesSearch = !searchLower ||
        eq.name.toLowerCase().includes(searchLower) ||
        eq.state.toLowerCase().includes(searchLower) ||
        eq.city.toLowerCase().includes(searchLower) ||
        eq.epicenter.toLowerCase().includes(searchLower) ||
        String(eq.year).includes(searchLower) ||
        String(eq.magnitude).includes(searchLower) ||
        (eq.infrastructureDamage?.buildings && eq.infrastructureDamage.buildings.toLowerCase().includes(searchLower));

      // State Filter
      const matchesState = eqFilterState === 'All' || eq.state.toLowerCase().includes(eqFilterState.toLowerCase());

      // Magnitude Filter
      let matchesMag = true;
      if (eqFilterMinMag === '8.0+') matchesMag = eq.magnitude >= 8.0;
      else if (eqFilterMinMag === '7.0+') matchesMag = eq.magnitude >= 7.0;
      else if (eqFilterMinMag === '6.0+') matchesMag = eq.magnitude >= 6.0;
      else if (eqFilterMinMag === '5.0+') matchesMag = eq.magnitude >= 5.0;

      // Year Filter
      let matchesYear = true;
      if (eqFilterYear === 'post-2000') matchesYear = eq.year >= 2000;
      else if (eqFilterYear === '1950-1999') matchesYear = eq.year >= 1950 && eq.year < 2000;
      else if (eqFilterYear === 'pre-1950') matchesYear = eq.year < 1950;

      return matchesSearch && matchesState && matchesMag && matchesYear;
    });
  }, [earthquakes, eqSearchQuery, eqFilterState, eqFilterMinMag, eqFilterYear]);

  // Actions
  const addInfrastructure = (newRecord) => {
    const riskEval = calculateRiskScore({
      type: newRecord.type,
      age: newRecord.age,
      crackMeasurement: newRecord.crackMeasurement,
      vibrationLevel: newRecord.vibrationLevel,
      structuralDeformation: newRecord.structuralDeformation,
      moistureLevel: newRecord.moistureLevel
    });

    const id = `INF-IN-${String(Date.now()).slice(-4)}`;
    const fullRecord = {
      id,
      ...newRecord,
      age: Number(newRecord.age) || 1,
      crackMeasurement: Number(newRecord.crackMeasurement) || 0.1,
      vibrationLevel: Number(newRecord.vibrationLevel) || 1.0,
      structuralDeformation: Number(newRecord.structuralDeformation) || 1.0,
      moistureLevel: Number(newRecord.moistureLevel) || 20,
      sensorsActive: Number(newRecord.sensorsActive) || 24,
      coordinates: newRecord.coordinates && newRecord.coordinates.length === 2 
        ? [Number(newRecord.coordinates[0]), Number(newRecord.coordinates[1])] 
        : [20.5937, 78.9629],
      riskScore: riskEval.riskScore,
      healthScore: riskEval.healthScore,
      riskCategory: riskEval.riskCategory,
      recommendedAction: riskEval.recommendedAction,
      lastInspectionDate: new Date().toISOString().split('T')[0],
      inspectionOfficer: newRecord.inspectionOfficer || 'Er. Staff Inspector',
      keyDefects: newRecord.keyDefects || ['Initial baseline assessment recorded.'],
      historicalTrends: [
        { month: 'Jun 2026', vibration: Math.max(0.5, newRecord.vibrationLevel * 0.9), crack: Math.max(0.05, newRecord.crackMeasurement * 0.9), deformation: Math.max(0.5, newRecord.structuralDeformation * 0.9), health: riskEval.healthScore + 2 },
        { month: 'Jul 2026', vibration: Math.max(0.6, newRecord.vibrationLevel * 0.92), crack: Math.max(0.06, newRecord.crackMeasurement * 0.92), deformation: Math.max(0.6, newRecord.structuralDeformation * 0.92), health: riskEval.healthScore + 1 },
        { month: 'Aug 2026', vibration: Math.max(0.7, newRecord.vibrationLevel * 0.95), crack: Math.max(0.07, newRecord.crackMeasurement * 0.95), deformation: Math.max(0.7, newRecord.structuralDeformation * 0.95), health: riskEval.healthScore + 1 },
        { month: 'Sep 2026', vibration: Math.max(0.7, newRecord.vibrationLevel * 0.97), crack: Math.max(0.08, newRecord.crackMeasurement * 0.97), deformation: Math.max(0.8, newRecord.structuralDeformation * 0.97), health: riskEval.healthScore },
        { month: 'Oct 2026', vibration: Number(newRecord.vibrationLevel), crack: Number(newRecord.crackMeasurement), deformation: Number(newRecord.structuralDeformation), health: riskEval.healthScore },
        { month: 'Nov 2026', vibration: Number(newRecord.vibrationLevel), crack: Number(newRecord.crackMeasurement), deformation: Number(newRecord.structuralDeformation), health: riskEval.healthScore }
      ]
    };

    setInfrastructure(prev => [fullRecord, ...prev]);

    if (riskEval.riskScore > 50) {
      const alertId = `ALT-GEN-${String(Date.now()).slice(-4)}`;
      const newAlert = {
        id: alertId,
        infrastructureId: id,
        infrastructureName: fullRecord.name,
        location: `${fullRecord.city || ''}, ${fullRecord.state || ''}`,
        alertType: riskEval.riskCategory === 'Critical Risk' ? 'Critical Failure Threshold Risk' : 'High Strain Deviation Warning',
        riskLevel: riskEval.riskCategory,
        severity: riskEval.riskCategory === 'Critical Risk' ? 'critical' : 'high',
        date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
        status: 'Active',
        message: `Automatic alert generated on enrollment: Risk score ${riskEval.riskScore}/100. Urgent safety assessment warranted.`
      };
      setAlerts(prev => [newAlert, ...prev]);
    }

    return fullRecord;
  };

  const deleteInfrastructure = (id) => {
    setInfrastructure(prev => prev.filter(item => item.id !== id));
    setAlerts(prev => prev.filter(item => item.infrastructureId !== id));
    if (selectedInfra && selectedInfra.id === id) {
      setSelectedInfra(null);
    }
  };

  const updateInfrastructure = (id, fields) => {
    setInfrastructure(prev => prev.map(item => {
      if (item.id === id) {
        const merged = { ...item, ...fields };
        if (fields.crackMeasurement !== undefined || fields.vibrationLevel !== undefined || fields.structuralDeformation !== undefined || fields.moistureLevel !== undefined || fields.age !== undefined) {
          const evalResult = calculateRiskScore({
            type: merged.type,
            age: merged.age,
            crackMeasurement: merged.crackMeasurement,
            vibrationLevel: merged.vibrationLevel,
            structuralDeformation: merged.structuralDeformation,
            moistureLevel: merged.moistureLevel
          });
          merged.riskScore = evalResult.riskScore;
          merged.healthScore = evalResult.healthScore;
          merged.riskCategory = evalResult.riskCategory;
          merged.recommendedAction = evalResult.recommendedAction;
        }
        return merged;
      }
      return item;
    }));
  };

  const resolveAlert = (alertId) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'Resolved' } : a));
  };

  const saveAssessment = (assessmentResult) => {
    const record = {
      id: `ASM-${Date.now()}`,
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      ...assessmentResult
    };
    setAssessments(prev => [record, ...prev]);
    return record;
  };

  const resetToSampleData = () => {
    if (window.confirm('Reset all infrastructure, alerts and assessment data to factory demonstration defaults?')) {
      localStorage.removeItem(STORAGE_KEYS.INFRASTRUCTURE);
      localStorage.removeItem(STORAGE_KEYS.ALERTS);
      localStorage.removeItem(STORAGE_KEYS.ASSESSMENTS);
      setInfrastructure(INITIAL_INFRASTRUCTURE);
      setAlerts(INITIAL_ALERTS);
      setAssessments([]);
      setSelectedInfra(null);
      setSelectedEarthquake(null);
    }
  };

  return (
    <AppContext.Provider
      value={{
        // Nav & UI
        activeTab,
        setActiveTab,
        sidebarOpen,
        setSidebarOpen,
        mobileMenuOpen,
        setMobileMenuOpen,
        selectedInfra,
        setSelectedInfra,
        isAddModalOpen,
        setIsAddModalOpen,
        
        // Search & Filters
        searchQuery,
        setSearchQuery,
        filterType,
        setFilterType,
        filterRisk,
        setFilterRisk,
        
        // Infrastructure Data
        infrastructure,
        alerts,
        assessments,
        stats,
        maintenanceCatalog: MAINTENANCE_CATALOG,

        // Earthquake Intelligence Data & States
        earthquakes,
        filteredEarthquakes,
        selectedEarthquake,
        setSelectedEarthquake,
        eqSearchQuery,
        setEqSearchQuery,
        eqFilterState,
        setEqFilterState,
        eqFilterMinMag,
        setEqFilterMinMag,
        eqFilterYear,
        setEqFilterYear,
        selectedStateRisk,
        setSelectedStateRisk,
        compareStates,
        setCompareStates,
        stateSeismicProfiles: STATE_SEISMIC_PROFILES,
        dataMetadata: DATA_METADATA,
        
        // Mutations
        addInfrastructure,
        updateInfrastructure,
        deleteInfrastructure,
        resolveAlert,
        saveAssessment,
        resetToSampleData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
