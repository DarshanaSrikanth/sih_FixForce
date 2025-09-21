import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Timeline definitions
const TIMELINE_STEPS = [
  {
    key: 'Reported',
    icon: 'checkmark',
    color: '#1976D2',
    desc: 'Issue reported by citizen',
  },
  {
    key: 'Under Review',
    icon: 'search',
    color: '#F57C00',
    desc: 'Admin analyzing and categorizing',
  },
  {
    key: 'Assigned',
    icon: 'build',
    color: '#388E3C',
    desc: 'Resolution team assigned',
  },
  {
    key: 'In Progress',
    icon: 'rocket',
    color: '#FF9800',
    desc: 'Work is being carried out',
  },
  {
    key: 'Completed',
    icon: 'checkmark-done',
    color: '#4CAF50',
    desc: 'Issue has been resolved',
  },
];

// Map status to progress
const STATUS_PROGRESS = {
  'Pending': 10,
  'Under Review': 25,
  'Assigned': 50,
  'In Progress': 80,
  'Completed': 100,
};

// Map status to timeline index
const STATUS_IDX = {
  'Pending': 0,
  'Under Review': 1,
  'Assigned': 2,
  'In Progress': 3,
  'Completed': 4,
};

// Map status to color
const STATUS_COLORS = {
  'Pending': '#F44336',
  'Under Review': '#F57C00',
  'Assigned': '#388E3C',
  'In Progress': '#FF9800',
  'Completed': '#4CAF50',
};

const PRIORITY_COLORS = {
  'High': '#F44336',
  'Medium': '#FF9800',
  'Low': '#4CAF50',
};

const TrackStatus = ({
  onNavigate,
  selectedReport,
  updateReportStatus,
}) => {
  // UI animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(36)).current;
  // Feedback state
  const [rating, setRating] = useState(0);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(36);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 480, useNativeDriver: true }),
    ]).start();
  }, []);

  if (!selectedReport) {
    // Fallback/no data
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onNavigate('dashboard')} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#4A90E2"/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Track Status</Text>
        </View>
        <View style={styles.noDataWrap}>
          <Ionicons name="alert-circle" size={55} color="#BDC3C7" />
          <Text style={styles.noDataText}>
            No issue selected. Go back to Dashboard and pick a report to track its status.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Compose timeline steps based on status
  const currentIdx = STATUS_IDX[selectedReport.status] ?? 0;
  const timelineSteps = TIMELINE_STEPS.map((step, idx) => ({
    ...step,
    completed: idx <= currentIdx,
    active: idx === currentIdx,
    timestamp: selectedReport.timestamps?.[step.key],
  }));

  // For progress bar
  const progressValue = STATUS_PROGRESS[selectedReport.status] ?? 10;
  const progressBarWidth = `${progressValue}%`;

  // Color by status
  const mainColor = STATUS_COLORS[selectedReport.status] ?? '#F44336';

  // Feedback submit logic
  const handleFeedback = (value) => {
    setRating(value);
    setFeedbackGiven(true);
    setTimeout(() => {
      onNavigate('dashboard');
    }, 1250);
  };

  // Simulated assigned team info
  const assignedTeam = selectedReport.assignedTo || 'Civic Maintenance Team';
  const teamSpecialization = selectedReport.type === 'Pothole' ? 'Road Repairs' :
    selectedReport.type === 'Trash' ? 'Sanitation' :
    selectedReport.type === 'Streetlight' ? 'Electrical' : 'Civic Services';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('dashboard')} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#4A90E2"/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Issue Status</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <Animated.View style={[
          styles.summaryCard,
          { opacity: fadeAnim, transform: [{translateY: slideAnim}] }
        ]}>
          {/* Summary Section */}
          <View style={styles.cardRow}>
            <View style={[styles.issueIconWrap, {backgroundColor: mainColor+'18'}]}>
              <Ionicons
                name={
                  selectedReport.type === 'Pothole' ? 'car' :
                  selectedReport.type === 'Streetlight' ? 'bulb' :
                  selectedReport.type === 'Trash' ? 'trash' :
                  selectedReport.type === 'Water Issue' ? 'water' :
                  selectedReport.type === 'Road Damage' ? 'construct' : 'alert-circle'
                }
                size={33}
                color={mainColor}
              />
            </View>
            <View style={styles.issueInfo}>
              <Text style={styles.issueType}>{selectedReport.type}</Text>
              <View style={styles.issueMetaRow}>
                <View style={[styles.statusBadge, {backgroundColor: mainColor}]}>
                  <Text style={styles.statusBadgeText}>{selectedReport.status}</Text>
                </View>
                <View style={[
                  styles.priorityBadge,
                  { borderColor: PRIORITY_COLORS[selectedReport.priority] }
                ]}>
                  <Text style={[
                    styles.priorityBadgeText,
                    { color: PRIORITY_COLORS[selectedReport.priority] }
                  ]}>
                    {selectedReport.priority}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.issueDescription}>
            {selectedReport.description}
          </Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={16} color="#4A90E2"/>
            <Text style={styles.locationText}>
              {selectedReport.location}
            </Text>
          </View>
          <View style={styles.dateRow}>
            <Ionicons name="calendar" size={15} color="#95A5A6"/>
            <Text style={styles.dateText}>Reported: {selectedReport.date}</Text>
          </View>
        </Animated.View>

        {/* Progress Bar */}
        <View style={styles.progressWrap}>
          <View style={styles.progressHead}>
            <Text style={styles.progressText}>Progress</Text>
            <Text style={styles.progressPct}>{progressValue}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[
              styles.progressBarFill,
              { width: progressBarWidth, backgroundColor: mainColor }
            ]} />
          </View>
        </View>

        {/* Timeline Section */}
        <View style={styles.timelineWrap}>
          <Text style={styles.timelineTitle}>Status Timeline</Text>
          {timelineSteps.map((step, idx) => (
            <View key={step.key} style={styles.timelineStepRow}>
              <View style={styles.timelineIconColumn}>
                <View style={[
                  styles.timelineIconWrap,
                  step.completed ? { backgroundColor: step.color } : { backgroundColor: '#E3F2FD' }
                ]}>
                  <Ionicons name={step.icon} size={18} color={step.completed ? 'white' : step.color}/>
                </View>
                {idx < timelineSteps.length-1 && (
                  <View style={[
                    styles.timelineLine,
                    step.completed ? { backgroundColor: step.color } : {backgroundColor: '#EAEDED'}
                  ]}/>
                )}
              </View>
              <View style={styles.timelineTextColumn}>
                <Text style={[
                  styles.timelineStepLabel,
                  step.active && { color: step.color }
                ]}>
                  {step.key}
                </Text>
                <Text style={styles.timelineStepDesc}>{step.desc}</Text>
                {step.timestamp && (
                  <Text style={styles.timelineTimestamp}>
                    {step.timestamp}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Team Assignment */}
        <View style={styles.teamCard}>
          <Text style={styles.teamTitle}>Team Assignment</Text>
          <Text style={styles.teamName}>{assignedTeam}</Text>
          <Text style={styles.teamRole}>Specialization: {teamSpecialization}</Text>
          <View style={styles.teamActionsRow}>
            <TouchableOpacity style={styles.teamActionBtn}>
              <Ionicons name="call" size={16} color="#4A90E2"/>
              <Text style={styles.actionBtnText}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.teamActionBtn}>
              <Ionicons name="refresh" size={16} color="#4A90E2"/>
              <Text style={styles.actionBtnText}>Request Update</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feedback Section (if completed) */}
        {selectedReport.status === 'Completed' && (
          <View style={styles.feedbackSection}>
            <Text style={styles.feedbackPrompt}>Rate the Service</Text>
            <View style={styles.ratingRow}>
              {[1,2,3,4,5].map(val => (
                <TouchableOpacity
                  key={val}
                  onPress={() => handleFeedback(val)}
                  activeOpacity={0.85}
                  disabled={feedbackGiven}
                >
                  <Ionicons
                    name={rating >= val ? 'star' : 'star-outline'}
                    size={38}
                    color={rating >= val ? '#FFC107' : '#B4D4E8'}
                  />
                </TouchableOpacity>
              ))}
            </View>
            {feedbackGiven && (
              <Text style={styles.feedbackThanks}>
                Thanks for your feedback!
              </Text>
            )}
          </View>
        )}

        {/* Bottom spacing */}
        <View style={{height: 30}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFB' },
  scrollView: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 10,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  backBtn: {
    marginRight: 16,
    padding: 7,
    borderRadius: 12,
    backgroundColor: '#F0F6FB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 23,
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 13,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 10,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  issueIconWrap: {
    padding: 13,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
  },
  issueInfo: { flex: 1 },
  issueType: {
    fontSize: 19,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 2,
  },
  issueMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: 'center',
    marginRight: 9,
  },
  statusBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  priorityBadge: {
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  priorityBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  issueDescription: {
    fontSize: 15,
    color: '#5D6D7E',
    marginBottom: 14,
    lineHeight: 23,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
  },
  locationText: {
    fontSize: 13,
    color: '#1976D2',
    fontWeight: '600',
    marginLeft: 6,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 13,
    color: '#7F8C8D',
    fontWeight: '500',
    marginLeft: 4,
  },

  // Progress Bar
  progressWrap: {
    marginHorizontal: 22,
    marginBottom: 28,
    marginTop: 7,
  },
  progressHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  progressText: {
    fontSize: 13,
    color: '#2C3E50',
    fontWeight: '700',
  },
  progressPct: {
    fontSize: 13,
    color: '#95A5A6',
    fontWeight: '500',
  },
  progressBarBg: {
    width: '100%',
    height: 9,
    borderRadius: 6,
    backgroundColor: '#E3F2FD',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 9,
    borderRadius: 6,
    backgroundColor: '#4A90E2',
  },

  // Timeline
  timelineWrap: {
    marginHorizontal: 25,
    marginBottom: 22,
    marginTop: 2,
  },
  timelineTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 12,
    marginLeft: 3,
  },
  timelineStepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 62,
  },
  timelineIconColumn: {
    alignItems: 'center',
    marginRight: 11,
    width: 30,
  },
  timelineIconWrap: {
    width: 25,
    height: 25,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    marginTop: 1,
  },
  timelineLine: {
    width: 5,
    height: 35,
    borderRadius: 2,
    backgroundColor: '#E3F2FD',
    alignSelf: 'center',
    marginBottom: 2,
  },
  timelineTextColumn: {
    flex: 1,
    paddingTop: 2,
    paddingBottom: 9,
    borderBottomColor: '#EAEDED',
    borderBottomWidth: 1.15,
  },
  timelineStepLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#5D6D7E',
    marginBottom: 1,
  },
  timelineStepDesc: {
    fontSize: 13,
    color: '#95A5A6',
    marginBottom: 3,
    lineHeight: 19,
  },
  timelineTimestamp: {
    fontSize: 12,
    color: '#B4D4E8',
    marginBottom: 3,
  },

  // Team Card
  teamCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 17,
    marginHorizontal: 23,
    marginBottom: 22,
    elevation: 2,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  teamTitle: {
    fontSize: 15,
    color: '#2C3E50',
    fontWeight: '700',
    marginBottom: 3,
  },
  teamName: {
    fontSize: 13,
    color: '#4A90E2',
    fontWeight: '600',
    marginBottom: 2,
    marginTop: 1,
  },
  teamRole: {
    fontSize: 12,
    color: '#7F8C8D',
    fontWeight: '500',
    marginBottom: 6,
  },
  teamActionsRow: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 7,
  },
  teamActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 13,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 10,
  },
  actionBtnText: {
    color: '#4A90E2',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 7,
  },

  // Feedback
  feedbackSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 17,
    marginHorizontal: 23,
    marginBottom: 22,
    elevation: 2,
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 9,
  },
  feedbackPrompt: {
    fontSize: 15,
    color: '#2C3E50',
    fontWeight: '700',
    marginBottom: 9,
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  feedbackThanks: {
    fontSize: 15,
    color: '#4A90E2',
    fontWeight: '700',
    marginTop: 10,
  },

  // No data
  noDataWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 38,
  },
  noDataText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 19,
    lineHeight: 23,
  },
});


export default TrackStatus;
