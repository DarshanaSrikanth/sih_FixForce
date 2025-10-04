import React, { useEffect, useRef } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import LanguageToggle from '../components/LanguageToggle';
import { useLanguage } from '../LanguageContext';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ onNavigate }) => {
  const { t } = useLanguage();
  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const logoRotateAnim = useRef(new Animated.Value(0)).current;

  // Initialize animations on component mount
  useEffect(() => {
    // Sequence of animations for professional entrance
    Animated.sequence([
      // First: Scale and fade the logo
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Then: Slide content up and complete fade
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Subtle logo rotation animation (continuous)
    Animated.loop(
      Animated.timing(logoRotateAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Logo rotation interpolation
  const logoRotation = logoRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', padding: 12 }}>
        <LanguageToggle />
      </View>
      <View style={styles.content}>
        
        {/* Main Logo and Branding Section */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          {/* Logo with subtle animation */}
          <View style={styles.logoWrapper}>
            <Animated.View 
              style={[
                styles.logoIcon,
                { transform: [{ rotate: logoRotation }] }
              ]}
            >
              <Ionicons name="business" size={60} color="#4A90E2" />
            </Animated.View>
            <View style={styles.logoGlow} />
          </View>
          
          {/* App Title */}
            <Text style={styles.appTitle}>{t('app_title')}</Text>
            <Text style={styles.appSubtitle}>{t('tagline')}</Text>
        </Animated.View>

        {/* Description Section */}
        <Animated.View
          style={[
            styles.descriptionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
            <Text style={styles.appDescription}>{t('description')}</Text>
        </Animated.View>

        {/* Feature Highlights Section */}
        <Animated.View
          style={[
            styles.featuresContainer,
            { opacity: fadeAnim },
          ]}
        >
          {/* Photo Reporting Feature */}
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Ionicons name="camera" size={28} color="#4A90E2" />
            </View>
              <Text style={styles.featureText}>{t('feature_photo')}</Text>
              <Text style={styles.featureSubtext}>{t('feature_photo_sub')}</Text>
          </View>
          
          {/* GPS Tracking Feature */}
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Ionicons name="location" size={28} color="#4A90E2" />
            </View>
              <Text style={styles.featureText}>{t('feature_gps')}</Text>
              <Text style={styles.featureSubtext}>{t('feature_gps_sub')}</Text>
          </View>
          
          {/* Real-time Updates Feature */}
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Ionicons name="notifications" size={28} color="#4A90E2" />
            </View>
              <Text style={styles.featureText}>{t('feature_live')}</Text>
              <Text style={styles.featureSubtext}>{t('feature_live_sub')}</Text>
          </View>
        </Animated.View>

        {/* Call-to-Action Button */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => onNavigate('dashboard')}
            activeOpacity={0.8}
          >
              <Text style={styles.buttonText}>{t('get_started')}</Text>
            <View style={styles.buttonIconContainer}>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </View>
          </TouchableOpacity>
          
          {/* Secondary info text */}
            <Text style={styles.startButtonSubtext}>{t('join_citizens')}</Text>
        </Animated.View>

        {/* Bottom decoration */}
        <Animated.View 
          style={[
            styles.bottomDecoration,
            { opacity: fadeAnim }
          ]}
        >
          <View style={styles.decorationDots}>
            <View style={[styles.dot, { backgroundColor: '#4A90E2' }]} />
            <View style={[styles.dot, { backgroundColor: '#7FB3D3' }]} />
            <View style={[styles.dot, { backgroundColor: '#B4D4E8' }]} />
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  
  // Logo Section Styles
  logoContainer: {
    alignItems: 'center',
    marginBottom: 35,
  },
  logoWrapper: {
    position: 'relative',
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 20,
    elevation: 10,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    zIndex: 2,
  },
  logoGlow: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    backgroundColor: '#4A90E2',
    opacity: 0.1,
    borderRadius: 48,
    zIndex: 1,
  },
  
  // Typography Styles
  appTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -1,
  },
  appSubtitle: {
    fontSize: 18,
    color: '#7F8C8D',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 26,
  },
  
  // Description Section
  descriptionContainer: {
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  appDescription: {
    fontSize: 16,
    color: '#5D6D7E',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '400',
  },
  
  // Features Section
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 45,
    paddingHorizontal: 10,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 8,
  },
  featureIcon: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 18,
    marginBottom: 12,
    elevation: 6,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#2C3E50',
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 4,
  },
  featureSubtext: {
    fontSize: 11,
    color: '#95A5A6',
    textAlign: 'center',
    fontWeight: '500',
  },
  
  // Button Section
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  getStartedButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    minWidth: 220,
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
  },
  buttonIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 6,
  },
  startButtonSubtext: {
    fontSize: 13,
    color: '#95A5A6',
    textAlign: 'center',
    fontWeight: '500',
  },
  
  // Bottom Decoration
  bottomDecoration: {
    alignItems: 'center',
    marginTop: 20,
  },
  decorationDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default HomeScreen;