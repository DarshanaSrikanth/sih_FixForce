import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import LanguageToggle from '../components/LanguageToggle';
import { useLanguage } from '../LanguageContext';

const { width } = Dimensions.get('window');

// Mock data for demonstration when no real reports exist
const mockReports = [
  {
    id: 1,
    type: 'Pothole',
    description: 'Large pothole on Main Street causing traffic issues and vehicle damage',
    status: 'In Progress',
    priority: 'High',
    date: '2025-09-20',
    location: 'Main Street, T. Nagar, Chennai',
    assignedTo: 'Road Maintenance Team A',
  },
  {
    id: 2,
    type: 'Streetlight',
    description: 'Broken streetlight near bus stop creating safety concerns at night',
    status: 'Completed',
    priority: 'Medium',
    date: '2025-09-18',
    location: 'Bus Stop, Anna Nagar, Chennai',
    assignedTo: 'Electrical Maintenance Team B',
  },
  {
    id: 3,
    type: 'Trash',
    description: 'Garbage overflow in residential area attracting pests and causing bad odor',
    status: 'Pending',
    priority: 'High',
    date: '2025-09-21',
    location: 'Sector 15, Adyar, Chennai',
    assignedTo: 'Sanitation Team C',
  },
];

const Dashboard = ({ onNavigate, reports = [], updateReportStatus }) => {
  const { t } = useLanguage();
  // Use mock data if no real reports exist (for demo purposes)
  const displayReports = reports.length > 0 ? reports : mockReports;
  
  // Animation and state management
  const [refreshing, setRefreshing] = useState(false);
  const [greeting, setGreeting] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Initialize animations and greeting
  useEffect(() => {
    // Set appropriate greeting based on time
    const hour = new Date().getHours();
  if (hour < 12) setGreeting(t('good_morning'));
  else if (hour < 17) setGreeting(t('good_afternoon'));
  else setGreeting(t('good_evening'));

    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Refresh functionality
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // Utility functions for styling
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#4CAF50';
      case 'In Progress': return '#FF9800';
      case 'Pending': return '#F44336';
      default: return '#757575';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#F44336';
      case 'Medium': return '#FF9800';
      case 'Low': return '#4CAF50';
      default: return '#757575';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Pothole': return 'car';
      case 'Streetlight': return 'bulb';
      case 'Trash': return 'trash';
      case 'Water Issue': return 'water';
      case 'Road Damage': return 'construct';
      default: return 'alert-circle';
    }
  };

  // Calculate statistics
  const stats = {
    total: displayReports.length,
    pending: displayReports.filter(r => r.status === 'Pending').length,
    inProgress: displayReports.filter(r => r.status === 'In Progress').length,
    completed: displayReports.filter(r => r.status === 'Completed').length,
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>{t('dashboard')}</Text>
            <Text style={styles.headerSubtitle}>
              {greeting}, {t('citizen')}! 👋
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <LanguageToggle />
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={() => onNavigate('home')}
            >
              <Ionicons name="log-out-outline" size={24} color="#4A90E2" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Animated.ScrollView 
        style={[styles.scrollView, { opacity: fadeAnim }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Statistics Cards Section */}
        <Animated.View 
          style={[
            styles.statsContainer,
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          {/* Total Reports Card */}
          <View style={[styles.statCard, styles.totalCard]}>
            <View style={styles.statIconContainer}>
              <Ionicons name="document-text" size={24} color="#1976D2" />
            </View>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>{t('total_reports')}</Text>
            <Text style={styles.statSubLabel}>{t('all_time')}</Text>
          </View>
          
          {/* Pending Reports Card */}
          <View style={[styles.statCard, styles.pendingCard]}>
            <View style={styles.statIconContainer}>
              <Ionicons name="time" size={24} color="#F57C00" />
            </View>
            <Text style={styles.statNumber}>{stats.pending}</Text>
            <Text style={styles.statLabel}>{t('pending')}</Text>
            <Text style={styles.statSubLabel}>{t('awaiting_review')}</Text>
          </View>
          
          {/* Resolved Reports Card */}
          <View style={[styles.statCard, styles.completedCard]}>
            <View style={styles.statIconContainer}>
              <Ionicons name="checkmark-circle" size={24} color="#388E3C" />
            </View>
            <Text style={styles.statNumber}>{stats.completed}</Text>
            <Text style={styles.statLabel}>{t('resolved')}</Text>
            <Text style={styles.statSubLabel}>{t('issues_fixed')}</Text>
          </View>
        </Animated.View>

        {/* Quick Actions Section */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.reportButton}
            onPress={() => onNavigate('report')}
            activeOpacity={0.8}
          >
            <View style={styles.reportButtonContent}>
              <View style={styles.cameraIconContainer}>
                <Ionicons name="camera" size={32} color="white" />
              </View>
              <View style={styles.reportButtonTextContainer}>
                <Text style={styles.reportButtonText}>{t('report_new_issue')}</Text>
                <Text style={styles.reportButtonSubtext}>
                  {t('capture_and_submit')}
                </Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color="rgba(255,255,255,0.8)" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Recent Reports Section */}
        <View style={styles.reportsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('your_recent_reports')}</Text>
            <Text style={styles.sectionSubtitle}>
              {displayReports.length} {displayReports.length === 1 ? t('issue') : t('issues')} {t('reported')}
            </Text>
          </View>
          
          {displayReports.length === 0 ? (
            // Empty state
            <View style={styles.emptyState}>
              <Ionicons name="document-outline" size={48} color="#BDC3C7" />
              <Text style={styles.emptyStateTitle}>{t('no_reports_yet')}</Text>
              <Text style={styles.emptyStateText}>
                {t('no_reports_hint')}
              </Text>
            </View>
          ) : (
            // Reports list
            displayReports.map((report, index) => (
              <Animated.View
                key={report.id}
                style={[
                  styles.reportCard,
                  { 
                    opacity: fadeAnim,
                    transform: [{ 
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 30],
                        outputRange: [0, 30 * (index + 1)],
                      })
                    }]
                  }
                ]}
              >
                <TouchableOpacity
                  onPress={() => onNavigate('track', report)}
                  activeOpacity={0.7}
                >
                  {/* Report Header */}
                  <View style={styles.reportHeader}>
                    <View style={styles.reportIconContainer}>
                      <Ionicons 
                        name={getTypeIcon(report.type)} 
                        size={24} 
                        color="#4A90E2" 
                      />
                    </View>
                    
                    <View style={styles.reportInfo}>
                      <Text style={styles.reportType}>{report.type}</Text>
                      <View style={styles.locationRow}>
                        <Ionicons name="location" size={12} color="#7F8C8D" />
                        <Text style={styles.reportLocation}>{report.location}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.reportStatus}>
                      <View 
                        style={[
                          styles.statusBadge, 
                          { backgroundColor: getStatusColor(report.status) }
                        ]}
                      >
                        <Text style={styles.statusText}>{report.status}</Text>
                      </View>
                      <View 
                        style={[
                          styles.priorityBadge, 
                          { borderColor: getPriorityColor(report.priority) }
                        ]}
                      >
                        <Text 
                          style={[
                            styles.priorityText, 
                            { color: getPriorityColor(report.priority) }
                          ]}
                        >
                          {report.priority}
                        </Text>
                      </View>
                    </View>
                  </View>
                  
                  {/* Report Description */}
                  <Text style={styles.reportDescription} numberOfLines={2}>
                    {report.description}
                  </Text>
                  
                  {/* Report Footer */}
                  <View style={styles.reportFooter}>
                    <View style={styles.dateContainer}>
                      <Ionicons name="calendar" size={12} color="#7F8C8D" />
                      <Text style={styles.reportDate}>{report.date}</Text>
                    </View>
                    
                    <View style={styles.viewButton}>
                      <Text style={styles.viewButtonText}>{t('view_details')}</Text>
                      <Ionicons name="arrow-forward" size={12} color="#4A90E2" />
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))
          )}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
  
  // Header Styles
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  logoutButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  
  // Scroll View
  scrollView: {
    flex: 1,
  },
  
  // Statistics Section
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 25,
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginHorizontal: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  totalCard: {
    backgroundColor: '#E3F2FD',
  },
  pendingCard: {
    backgroundColor: '#FFF3E0',
  },
  completedCard: {
    backgroundColor: '#E8F5E8',
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#2C3E50',
    fontWeight: '600',
    marginBottom: 2,
  },
  statSubLabel: {
    fontSize: 11,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  
  // Action Button Section
  actionContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  reportButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    padding: 20,
    elevation: 6,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  reportButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cameraIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 12,
    marginRight: 16,
  },
  reportButtonTextContainer: {
    flex: 1,
  },
  reportButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reportButtonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  
  // Reports Section
  reportsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  
  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 20,
  },
  
  // Report Card Styles
  reportCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportIconContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 24,
    padding: 12,
    marginRight: 14,
  },
  reportInfo: {
    flex: 1,
  },
  reportType: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportLocation: {
    fontSize: 13,
    color: '#7F8C8D',
    marginLeft: 4,
    fontWeight: '500',
  },
  reportStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    marginBottom: 6,
  },
  statusText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1.5,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
  },
  reportDescription: {
    fontSize: 15,
    color: '#5D6D7E',
    lineHeight: 22,
    marginBottom: 14,
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportDate: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 4,
    fontWeight: '500',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  viewButtonText: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '700',
    marginRight: 6,
  },
  
  // Bottom Spacing
  bottomSpacing: {
    height: 30,
  },
});

export default Dashboard;