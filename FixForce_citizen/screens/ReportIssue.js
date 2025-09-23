import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import LanguageToggle from '../components/LanguageToggle';
import { useLanguage } from '../LanguageContext';

// For demonstration: Random location generator
const mockLocation = () => ({
  latitude: 13.0827 + Math.random() * 0.01,
  longitude: 80.2707 + Math.random() * 0.01,
  address: 'Chennai, Tamil Nadu',
});

// Category grid info
const categories = [
  { key: 'Pothole', icon: 'car', color: '#F44336' },
  { key: 'Streetlight', icon: 'bulb', color: '#00BCD4' },
  { key: 'Trash', icon: 'trash', color: '#2196F3' },
  { key: 'Water Issue', icon: 'water', color: '#4CAF50' },
  { key: 'Road Damage', icon: 'construct', color: '#FFEB3B' },
  { key: 'Other', icon: 'alert-circle', color: '#BA68C8' },
];



const ReportIssue = ({ onNavigate, onSubmitReport }) => {
  const { t } = useLanguage();
  const stepTitles = [t('step1'), t('step2'), t('step3')];
  // Step state
  const [step, setStep] = useState(0);

  // Animated transitions
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  // Step 1 state (Photo & Location)
  const [photoTaken, setPhotoTaken] = useState(false);
  const [location, setLocation] = useState(mockLocation());

  // Step 2 state (Category)
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Step 3 state (Description)
  const [description, setDescription] = useState('');
  const [voiceActive, setVoiceActive] = useState(false);
  const descriptionRef = useRef();

  // Success modal state
  const [success, setSuccess] = useState(false);

  // Animate on step change
  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(40);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [step]);

  // Simulate Voice-to-Text Demo
  const handleVoiceToText = () => {
    setVoiceActive(true);
    setTimeout(() => {
      setDescription(
        description +
        (description ? ' ' : '') +
        "Broken pipe flooding the road, urgent attention required."
      );
      setVoiceActive(false);
      descriptionRef.current && descriptionRef.current.focus();
    }, 1400);
  };

  // Handle step navigation
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Handle photo capture (mock)
  const handlePhotoCapture = () => {
    setPhotoTaken(true);
    // For demo: generate mock location each capture
    setLocation(mockLocation());
  };

  // Handle category selection
  const handleCategorySelect = (key) => setSelectedCategory(key);

  // Submit logic
  const handleSubmit = () => {
    // Compose new report data
    const newReport = {
      type: selectedCategory || 'Other',
      description: description.trim(),
      priority: (selectedCategory === 'Pothole' || selectedCategory === 'Trash') ? 'High' : 'Medium',
      location: `${location.address} (${location.latitude.toFixed(4)},${location.longitude.toFixed(4)})`,
      assignedTo: '', // Blank for demo
      status: 'Pending',
    };
    onSubmitReport(newReport);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onNavigate('dashboard');
    }, 1950);
  };

  // Progress bar value (0-3)
  const progress = step + 1;

  // Render step content
  const renderStep = () => {
    switch (step) {
      case 0:
        // Step 1: Camera + GPS
        return (
          <Animated.View style={[styles.stepContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.stepTitle}>{t('step1')}</Text>
            <TouchableOpacity
              style={[styles.photoButton, photoTaken && styles.photoTaken]}
              onPress={handlePhotoCapture}
              activeOpacity={0.85}
            >
              {photoTaken ? (
                <>
                  <Ionicons name="checkmark-circle" size={42} color="#4A90E2" />
                  <Text style={styles.photoTakenText}>{t('photo_captured')}</Text>
                </>
              ) : (
                <>
                  <Ionicons name="camera" size={42} color="#7FB3D3" />
                  <Text style={styles.photoButtonText}>{t('tap_to_capture')}</Text>
                </>
              )}
            </TouchableOpacity>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={22} color="#4A90E2" />
              <Text style={styles.locationText}>
                {location.address} ({location.latitude.toFixed(4)},{location.longitude.toFixed(4)})
              </Text>
            </View>
            <View style={styles.stepActions}>
              {photoTaken ? (
                <TouchableOpacity style={styles.nextBtn} onPress={nextStep}>
                  <Text style={styles.nextBtnText}>{t('next_categorize')}</Text>
                  <Ionicons name="arrow-forward" size={18} color="white" />
                </TouchableOpacity>
              ) : null}
            </View>
          </Animated.View>
        );
      case 1:
        // Step 2: Category Grid
        return (
          <Animated.View style={[styles.stepContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.stepTitle}>{t('step2_full')}</Text>
            <View style={styles.categoryGrid}>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat.key}
                  style={[
                    styles.categoryCard,
                    selectedCategory === cat.key && { borderColor: cat.color, borderWidth: 2 },
                  ]}
                  onPress={() => handleCategorySelect(cat.key)}
                  activeOpacity={0.85}
                >
                  <View style={[styles.categoryIcon, { backgroundColor: cat.color }]}>
                    <Ionicons name={cat.icon} size={24} color="white" />
                  </View>
                  <Text style={styles.categoryLabel}>{t(cat.key.toLowerCase().replace(/ /g, '_')) || cat.key}</Text>
                  {selectedCategory === cat.key && (
                    <Ionicons name="checkmark" size={20} color={cat.color} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.stepActions}>
              <TouchableOpacity style={styles.prevBtn} onPress={prevStep}>
                <Ionicons name="arrow-back" size={16} color="#4A90E2" />
                <Text style={styles.prevBtnText}>Back</Text>
              </TouchableOpacity>
              {selectedCategory && (
                <TouchableOpacity style={styles.nextBtn} onPress={nextStep}>
                  <Text style={styles.nextBtnText}>{t('next_describe')}</Text>
                  <Ionicons name="arrow-forward" size={18} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        );
      case 2:
        // Step 3: Description + Voice
        return (
          <Animated.View style={[styles.stepContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.stepTitle}>{t('step3_full')}</Text>
            <View style={styles.descriptionContainer}>
              <TextInput
                ref={descriptionRef}
                style={styles.textInput}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                maxLength={200}
                placeholder={t('describe_placeholder')}
                placeholderTextColor="#95A5A6"
              />
              <TouchableOpacity
                style={[
                  styles.voiceBtn,
                  voiceActive && { backgroundColor: '#7FB3D3' },
                ]}
                onPress={handleVoiceToText}
                disabled={voiceActive}
                activeOpacity={0.85}
              >
                <Ionicons name="mic" size={22} color="#4A90E2" />
                <Text style={styles.voiceBtnText}>
                  {voiceActive ? t('listening') : t('voice_to_text')}
                </Text>
                {voiceActive && <View style={styles.recordIndicator} />}
              </TouchableOpacity>
            </View>
            <View style={styles.stepActions}>
              <TouchableOpacity style={styles.prevBtn} onPress={prevStep}>
                <Ionicons name="arrow-back" size={16} color="#4A90E2" />
                <Text style={styles.prevBtnText}>{t('back')}</Text>
              </TouchableOpacity>
              {description.trim().length > 7 && (
                <TouchableOpacity style={styles.nextBtn} onPress={handleSubmit}>
                  <Text style={styles.nextBtnText}>{t('submit_issue')}</Text>
                  <Ionicons name="checkmark" size={19} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        );
      default:
        return null;
    }
  };

  // Step indicator for header
  const renderStepIndicator = () => (
    <View style={styles.stepIndicatorContainer}>
      {stepTitles.map((title, idx) => (
        <View key={idx} style={styles.stepIndicator}>
          <View
            style={[
              styles.stepDot,
              idx <= step ? styles.activeDot : styles.inactiveDot,
            ]}
          />
          <Text
            style={[
              styles.stepLabel,
              idx === step && styles.activeStepLabel,
            ]}
          >
            {title}
          </Text>
          {idx < stepTitles.length - 1 && (
            <View
              style={[
                styles.stepLine,
                step > idx && { backgroundColor: '#4A90E2' },
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );

  // Animated success modal
  const renderSuccessModal = () =>
    success ? (
      <View style={styles.successModal}>
        <Animated.View style={styles.successCheckWrapper}>
          <Ionicons name="checkmark-circle" size={64} color="#4A90E2" style={{ opacity: 0.93 }} />
        </Animated.View>
        <Text style={styles.successText}>Issue Submitted Successfully!</Text>
      </View>
    ) : null;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', padding: 12 }}>
        <LanguageToggle />
      </View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => onNavigate('dashboard')}>
          <Ionicons name="arrow-back" size={22} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Civic Issue</Text>
      </View>
      {/* Step Indicator */}
      {renderStepIndicator()}
      {/* Progress Bar */}
      <View style={styles.progressBarWrapper}>
        <View style={[styles.progressBar, { width: `${progress * 33.3}%`, backgroundColor: '#4A90E2' }]} />
        <View style={styles.progressBarBg} />
        <Text style={styles.progressBarText}>{progress}/3 steps completed</Text>
      </View>
      {/* Main Step */}
      <ScrollView style={styles.stepScroll}>
        {renderStep()}
      </ScrollView>
      {/* Success Modal */}
      {renderSuccessModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
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
    marginRight: 18,
    padding: 6,
    borderRadius: 12,
    backgroundColor: '#F0F6FB',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#2C3E50',
    letterSpacing: -0.5,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 17,
    backgroundColor: 'white',
    marginBottom: 12,
    borderBottomColor: '#E4E7EA',
    borderBottomWidth: 1.3,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    marginRight: 2,
  },
  activeDot: {
    backgroundColor: '#4A90E2',
  },
  inactiveDot: {
    backgroundColor: '#B4D4E8',
  },
  stepLabel: {
    fontSize: 13,
    color: '#95A5A6',
    fontWeight: '700',
    marginLeft: 2,
    marginRight: 6,
  },
  activeStepLabel: {
    color: '#1976D2',
  },
  stepLine: {
    height: 2,
    backgroundColor: '#B4D4E8',
    width: 28,
    borderRadius: 1,
    marginHorizontal: 2,
  },
  progressBarWrapper: {
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 4,
    alignItems: 'flex-start',
  },
  progressBar: {
    height: 7,
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },
  progressBarBg: {
    width: '100%',
    height: 7,
    borderRadius: 5,
    backgroundColor: '#E3EDF7',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  progressBarText: {
    fontSize: 11,
    color: '#95A5A6',
    fontWeight: '500',
    marginTop: 8,
    marginLeft: 4,
  },
  stepScroll: {
    flex: 1,
    paddingHorizontal: 0,
  },
  stepContent: {
    padding: 24,
    marginBottom: 34,
  },
  stepTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 28,
    textAlign: 'center',
  },
  // Step 1 Styles
  photoButton: {
    backgroundColor: '#E3F2FD',
    borderRadius: 20,
    paddingVertical: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
    elevation: 3,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 9,
  },
  photoButtonText: {
    fontSize: 15,
    color: '#4A90E2',
    fontWeight: '700',
    marginTop: 9,
  },
  photoTaken: {
    backgroundColor: '#D4EDDA', // Greenish
  },
  photoTakenText: {
    fontSize: 15,
    color: '#388E3C',
    fontWeight: '700',
    marginTop: 9,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    backgroundColor: '#F0F6FB',
    borderRadius: 14,
    padding: 12,
    justifyContent: 'center',
  },
  locationText: {
    fontSize: 15,
    color: '#1976D2',
    fontWeight: '600',
    marginLeft: 7,
  },
  // Step 2 Styles
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 2,
    marginBottom: 30,
  },
  categoryCard: {
    width: '31%',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 15,
    borderColor: '#E3F2FD',
    borderWidth: 1.2,
    elevation: 2,
    shadowColor: '#4A90E2',
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    position: 'relative',
  },
  categoryIcon: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 19,
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 4,
  },
  checkIcon: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
  // Step 3 Styles
  descriptionContainer: {
    marginBottom: 36,
  },
  textInput: {
    height: 78,
    borderColor: '#B4D4E8',
    borderWidth: 1.5,
    borderRadius: 14,
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingTop: 9,
    fontSize: 15,
    color: '#2C3E50',
    fontWeight: '500',
    marginBottom: 13,
  },
  voiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F6FB',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: '#4A90E2',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  voiceBtnText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '700',
    marginLeft: 10,
  },
  recordIndicator: {
    width: 13,
    height: 13,
    backgroundColor: '#F44336',
    borderRadius: 7,
    marginLeft: 13,
    opacity: 0.7,
  },
  // Action Buttons
  stepActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 17,
  },
  nextBtn: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 21,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.17,
    shadowRadius: 7,
  },
  nextBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    marginRight: 7,
  },
  prevBtn: {
    backgroundColor: '#E3F2FD',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 19,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prevBtnText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 4,
  },
  // Success Modal
  successModal: {
    position: 'absolute',
    left: 35,
    right: 35,
    top: Dimensions.get('window').height / 3,
    backgroundColor: 'white',
    borderRadius: 22,
    alignItems: 'center',
    elevation: 8,
    paddingVertical: 38,
    zIndex: 100,
    shadowColor: '#4A90E2',
    shadowOpacity: 0.21,
    shadowOffset: { width: 0, height: 9 },
    shadowRadius: 27,
  },
  successCheckWrapper: {
    marginBottom: 18,
  },
  successText: {
    fontSize: 19,
    fontWeight: '700',
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 2,
  },
});

export default ReportIssue;
