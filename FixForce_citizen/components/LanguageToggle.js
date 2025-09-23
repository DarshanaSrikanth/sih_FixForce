import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  return (
    <TouchableOpacity style={styles.button} onPress={toggleLanguage}>
      <Text style={styles.text}>{language === 'en' ? 'HI' : 'EN'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  text: {
    fontWeight: 'bold',
    color: '#1976D2',
    fontSize: 15,
  },
});

export default LanguageToggle;
