import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AddInfrastructureModal } from './components/AddInfrastructureModal';
import { InfrastructureDetailsModal } from './components/InfrastructureDetailsModal';

// Infrastructure Fleet Pages
import { Dashboard } from './pages/Dashboard';
import { InfrastructureMap } from './pages/InfrastructureMap';
import { BridgeMonitoring } from './pages/BridgeMonitoring';
import { RoadMonitoring } from './pages/RoadMonitoring';
import { BuildingMonitoring } from './pages/BuildingMonitoring';
import { AIRiskAnalysis } from './pages/AIRiskAnalysis';
import { StructuralAnalysis } from './pages/StructuralAnalysis';
import { AlertsNotifications } from './pages/AlertsNotifications';
import { MaintenanceRecommendations } from './pages/MaintenanceRecommendations';
import { Reports } from './pages/Reports';

// Earthquake Intelligence Pages
import { EarthquakeHistory } from './pages/EarthquakeHistory';
import { EarthquakeMap } from './pages/EarthquakeMap';
import { EarthquakeRiskAnalysis } from './pages/EarthquakeRiskAnalysis';
import { EarthquakeDamageAssessment } from './pages/EarthquakeDamageAssessment';
import { StateComparison } from './pages/StateComparison';

const MainLayout = () => {
  const { activeTab } = useApp();

  const renderActivePage = () => {
    switch (activeTab) {
      // Infrastructure Fleet
      case 'dashboard':
        return <Dashboard />;
      case 'map':
        return <InfrastructureMap />;
      case 'bridges':
        return <BridgeMonitoring />;
      case 'roads':
        return <RoadMonitoring />;
      case 'buildings':
        return <BuildingMonitoring />;
      case 'ai-risk':
        return <AIRiskAnalysis />;
      case 'structural':
        return <StructuralAnalysis />;
      case 'alerts':
        return <AlertsNotifications />;
      case 'maintenance':
        return <MaintenanceRecommendations />;
      case 'reports':
        return <Reports />;

      // Earthquake Intelligence
      case 'eq-history':
        return <EarthquakeHistory />;
      case 'eq-map':
        return <EarthquakeMap />;
      case 'eq-risk':
        return <EarthquakeRiskAnalysis />;
      case 'eq-damage':
        return <EarthquakeDamageAssessment />;
      case 'eq-compare':
        return <StateComparison />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Execution Surface */}
      <div className="main-content">
        <Header />
        <main>{renderActivePage()}</main>
      </div>

      {/* Modals */}
      <AddInfrastructureModal />
      <InfrastructureDetailsModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
