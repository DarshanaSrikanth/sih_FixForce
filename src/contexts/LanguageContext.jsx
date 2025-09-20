import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

// Translation data
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.issues': 'Issues',
    'nav.employees': 'Employees',
    'nav.analytics': 'Analytics',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.assign': 'Assign',
    'common.submit': 'Submit',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.clear': 'Clear',
    'common.close': 'Close',
    
    // Landing Page
    'landing.title': 'CivicSync - सिविकसिंक',
    'landing.tagline': 'Syncing Citizens and Government for a Smarter Jharkhand',
    'landing.stats.resolved': 'Total Issues Resolved',
    'landing.stats.active': 'Active Cases',
    'landing.stats.response': 'Response Time',
    'landing.stats.success': 'Success Rate',
    'landing.features.ai': 'AI-Powered Issue Classification',
    'landing.features.priority': 'Real-time Priority Scoring',
    'landing.features.workflow': 'Automated Workflow Management',
    'landing.features.coordination': 'Multi-departmental Coordination',
    
    // Dashboard
    'dashboard.title': 'Admin Dashboard',
    'dashboard.welcome': 'Welcome back',
    'dashboard.metrics.high_priority': 'High Priority Issues',
    'dashboard.metrics.medium_priority': 'Medium Priority',
    'dashboard.metrics.low_priority': 'Low Priority',
    'dashboard.metrics.resolved_today': 'Resolved Today',
    'dashboard.issues.title': 'Priority-Based Issue List',
    'dashboard.issues.assign_workers': 'Assign Workers',
    'dashboard.issues.view_details': 'View Details',
    
    // Issue Categories
    'category.roads': 'Roads & Potholes',
    'category.lighting': 'Street Lighting',
    'category.waste': 'Waste Management',
    'category.water': 'Water Supply',
    'category.drainage': 'Drainage & Sewerage',
    'category.electricity': 'Electricity',
    'category.parks': 'Public Parks',
    'category.transport': 'Public Transport Issues',
    'category.healthcare': 'Healthcare Infrastructure',
    'category.education': 'Educational Infrastructure',
    
    // Priority Levels
    'priority.high': 'HIGH PRIORITY',
    'priority.medium': 'MEDIUM PRIORITY',
    'priority.low': 'LOW PRIORITY',
    'priority.score': 'Priority Score',
    
    // Status
    'status.reported': 'Reported',
    'status.assigned': 'Assigned',
    'status.in_progress': 'In Progress',
    'status.pending_review': 'Pending Review',
    'status.resolved': 'Resolved',
    'status.closed': 'Closed',
    
    // Special Tags
    'tag.school_zone': 'SCHOOL ZONE',
    'tag.hospital_zone': 'HOSPITAL ZONE',
    'tag.university_zone': 'UNIVERSITY ZONE',
    'tag.high_traffic': 'HIGH TRAFFIC',
    'tag.emergency': 'EMERGENCY',
    
    // Issue Details
    'issue.location': 'Location',
    'issue.description': 'Description',
    'issue.reported_by': 'Reported by',
    'issue.reported_at': 'Reported at',
    'issue.workers_needed': 'Workers Needed',
    'issue.estimated_resolution': 'Estimated Resolution',
    'issue.similar_issues': 'Similar Issues in Area',
    
    // Employee Management
    'employee.available': 'Available Employees',
    'employee.skills': 'Skills',
    'employee.rating': 'Rating',
    'employee.assign': 'Assign Employee',
    'employee.notification_sent': 'Notification sent to employee',
    
    // Analytics
    'analytics.title': 'Performance Analytics',
    'analytics.resolution_trends': 'Resolution Time Trends',
    'analytics.category_distribution': 'Category-wise Issue Distribution',
    'analytics.geographic_heatmap': 'Geographic Heat Map',
    'analytics.performance_metrics': 'Performance Metrics',
    'analytics.employee_efficiency': 'Employee Efficiency Ratings',
    
    // Notifications
    'notification.new_assignment': 'New assignment received',
    'notification.status_update': 'Status updated',
    'notification.priority_escalation': 'Priority escalated',
    'notification.system_alert': 'System alert',
    
    // AI Insights
    'ai.insights.title': 'AI Insights',
    'ai.insights.pattern_detected': 'Pattern detected in area',
    'ai.insights.recommendation': 'Recommendation',
    'ai.insights.prediction': 'Prediction',
  },
  
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.issues': 'समस्याएं',
    'nav.employees': 'कर्मचारी',
    'nav.analytics': 'विश्लेषण',
    'nav.settings': 'सेटिंग्स',
    'nav.logout': 'लॉग आउट',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.cancel': 'रद्द करें',
    'common.save': 'सेव करें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.view': 'देखें',
    'common.assign': 'नियुक्त करें',
    'common.submit': 'जमा करें',
    'common.search': 'खोजें',
    'common.filter': 'फिल्टर',
    'common.clear': 'साफ करें',
    'common.close': 'बंद करें',
    
    // Landing Page
    'landing.title': 'CivicSync - सिविकसिंक',
    'landing.tagline': 'बेहतर झारखंड के लिए नागरिकों और सरकार को जोड़ना',
    'landing.stats.resolved': 'कुल हल की गई समस्याएं',
    'landing.stats.active': 'सक्रिय मामले',
    'landing.stats.response': 'प्रतिक्रिया समय',
    'landing.stats.success': 'सफलता दर',
    'landing.features.ai': 'AI-संचालित समस्या वर्गीकरण',
    'landing.features.priority': 'रियल-टाइम प्राथमिकता स्कोरिंग',
    'landing.features.workflow': 'स्वचालित वर्कफ्लो प्रबंधन',
    'landing.features.coordination': 'बहु-विभागीय समन्वय',
    
    // Dashboard
    'dashboard.title': 'एडमिन डैशबोर्ड',
    'dashboard.welcome': 'वापस स्वागत है',
    'dashboard.metrics.high_priority': 'उच्च प्राथमिकता वाली समस्याएं',
    'dashboard.metrics.medium_priority': 'मध्यम प्राथमिकता',
    'dashboard.metrics.low_priority': 'कम प्राथमिकता',
    'dashboard.metrics.resolved_today': 'आज हल किया गया',
    'dashboard.issues.title': 'प्राथमिकता-आधारित समस्या सूची',
    'dashboard.issues.assign_workers': 'कर्मचारी नियुक्त करें',
    'dashboard.issues.view_details': 'विवरण देखें',
    
    // Issue Categories
    'category.roads': 'सड़क और गड्ढे',
    'category.lighting': 'स्ट्रीट लाइटिंग',
    'category.waste': 'अपशिष्ट प्रबंधन',
    'category.water': 'जल आपूर्ति',
    'category.drainage': 'जल निकासी',
    'category.electricity': 'बिजली',
    'category.parks': 'सार्वजनिक पार्क',
    'category.transport': 'सार्वजनिक परिवहन समस्याएं',
    'category.healthcare': 'स्वास्थ्य बुनियादी ढांचा',
    'category.education': 'शैक्षिक बुनियादी ढांचा',
    
    // Priority Levels
    'priority.high': 'उच्च प्राथमिकता',
    'priority.medium': 'मध्यम प्राथमिकता',
    'priority.low': 'कम प्राथमिकता',
    'priority.score': 'प्राथमिकता स्कोर',
    
    // Status
    'status.reported': 'रिपोर्ट किया गया',
    'status.assigned': 'नियुक्त किया गया',
    'status.in_progress': 'प्रगति में',
    'status.pending_review': 'समीक्षा लंबित',
    'status.resolved': 'हल किया गया',
    'status.closed': 'बंद किया गया',
    
    // Special Tags
    'tag.school_zone': 'स्कूल क्षेत्र',
    'tag.hospital_zone': 'अस्पताल क्षेत्र',
    'tag.university_zone': 'विश्वविद्यालय क्षेत्र',
    'tag.high_traffic': 'उच्च यातायात',
    'tag.emergency': 'आपातकाल',
    
    // Issue Details
    'issue.location': 'स्थान',
    'issue.description': 'विवरण',
    'issue.reported_by': 'रिपोर्ट किया गया',
    'issue.reported_at': 'रिपोर्ट का समय',
    'issue.workers_needed': 'आवश्यक कर्मचारी',
    'issue.estimated_resolution': 'अनुमानित समाधान',
    'issue.similar_issues': 'क्षेत्र में समान समस्याएं',
    
    // Employee Management
    'employee.available': 'उपलब्ध कर्मचारी',
    'employee.skills': 'कौशल',
    'employee.rating': 'रेटिंग',
    'employee.assign': 'कर्मचारी नियुक्त करें',
    'employee.notification_sent': 'कर्मचारी को सूचना भेजी गई',
    
    // Analytics
    'analytics.title': 'प्रदर्शन विश्लेषण',
    'analytics.resolution_trends': 'समाधान समय रुझान',
    'analytics.category_distribution': 'श्रेणी-वार समस्या वितरण',
    'analytics.geographic_heatmap': 'भौगोलिक हीट मैप',
    'analytics.performance_metrics': 'प्रदर्शन मेट्रिक्स',
    'analytics.employee_efficiency': 'कर्मचारी दक्षता रेटिंग',
    
    // Notifications
    'notification.new_assignment': 'नया असाइनमेंट प्राप्त हुआ',
    'notification.status_update': 'स्थिति अपडेट की गई',
    'notification.priority_escalation': 'प्राथमिकता बढ़ाई गई',
    'notification.system_alert': 'सिस्टम अलर्ट',
    
    // AI Insights
    'ai.insights.title': 'AI अंतर्दृष्टि',
    'ai.insights.pattern_detected': 'क्षेत्र में पैटर्न का पता चला',
    'ai.insights.recommendation': 'सिफारिश',
    'ai.insights.prediction': 'भविष्यवाणी',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('civicsync-language') || 'en';
    setLanguage(savedLanguage);
    setIsRTL(savedLanguage === 'hi');
  }, []);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setIsRTL(newLanguage === 'hi');
    localStorage.setItem('civicsync-language', newLanguage);
  };

  const t = (key, fallback = key) => {
    return translations[language]?.[key] || fallback;
  };

  const value = {
    language,
    isRTL,
    changeLanguage,
    t,
    translations: translations[language] || {}
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
