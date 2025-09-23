import React, { useState } from 'react';
import { LanguageProvider } from './LanguageContext';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import all screen components
import HomeScreen from './screens/HomeScreen';
import Dashboard from './screens/Dashboard';
import ReportIssue from './screens/ReportIssue';
import TrackStatus from './screens/TrackStatus';

function MainApp() {
  // State management for navigation
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedReport, setSelectedReport] = useState(null);
  const [userReports, setUserReports] = useState([]);

  // Navigation function
  const navigateTo = (screen, data = null) => {
    setCurrentScreen(screen);
    
    // Handle specific data passing
    if (data) {
      setSelectedReport(data);
    }
  };

  // Add new report function
  const addNewReport = (newReport) => {
    const reportWithId = {
      ...newReport,
      id: userReports.length + 1,
      date: new Date().toISOString().split('T')[0], // Current date
      status: 'Pending',
    };
    
    setUserReports(prevReports => [reportWithId, ...prevReports]);
    return reportWithId;
  };

  // Update report status (for demo purposes)
  const updateReportStatus = (reportId, newStatus) => {
    setUserReports(prevReports => 
      prevReports.map(report => 
        report.id === reportId 
          ? { ...report, status: newStatus }
          : report
      )
    );
  };

  // Screen rendering logic
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            onNavigate={navigateTo} 
          />
        );
        
      case 'dashboard':
        return (
          <Dashboard 
            onNavigate={navigateTo}
            reports={userReports}
            updateReportStatus={updateReportStatus}
          />
        );
        
      case 'report':
        return (
          <ReportIssue 
            onNavigate={navigateTo}
            onSubmitReport={addNewReport}
          />
        );
        
      case 'track':
        return (
          <TrackStatus 
            onNavigate={navigateTo}
            selectedReport={selectedReport}
            updateReportStatus={updateReportStatus}
          />
        );
        
      default:
        return (
          <HomeScreen 
            onNavigate={navigateTo} 
          />
        );
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="#F8FAFB" />
      {renderScreen()}
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}