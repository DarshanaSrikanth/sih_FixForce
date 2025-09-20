import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Shield, 
  Award,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart
} from 'lucide-react';

const Footer = () => {
  const { language, t } = useLanguage();

  const quickLinks = [
    { name: 'Home', nameHindi: 'होम', path: '/' },
    { name: 'Dashboard', nameHindi: 'डैशबोर्ड', path: '/dashboard' },
    { name: 'Report Issue', nameHindi: 'समस्या रिपोर्ट करें', path: '/report' },
    { name: 'Track Issue', nameHindi: 'समस्या ट्रैक करें', path: '/track' },
    { name: 'Analytics', nameHindi: 'विश्लेषण', path: '/analytics' }
  ];

  const supportLinks = [
    { name: 'Contact Us', nameHindi: 'संपर्क करें', path: '/contact' },
    { name: 'Help Center', nameHindi: 'सहायता केंद्र', path: '/help' },
    { name: 'Privacy Policy', nameHindi: 'गोपनीयता नीति', path: '/privacy' },
    { name: 'Terms of Service', nameHindi: 'सेवा की शर्तें', path: '/terms' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-800 to-secondary-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CS</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {t('landing.title')}
                </h3>
                <p className="text-sm text-gray-300">
                  Government of Jharkhand
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 text-hindi">
              Empowering citizens to report and track civic issues in their community. 
              Building a better tomorrow, one issue at a time.
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <Shield size={16} />
              <span className="text-sm">Official Government Portal</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-hindi"
                  >
                    {language === 'hi' ? link.nameHindi : link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-hindi"
                  >
                    {language === 'hi' ? link.nameHindi : link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail size={16} />
                <span className="text-sm">support@jharkhand.gov.in</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone size={16} />
                <span className="text-sm">+91 1800 180 1551</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin size={16} />
                <span className="text-sm">Ranchi, Jharkhand</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Globe size={16} />
                <span className="text-sm">www.jharkhand.gov.in</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h5 className="text-white font-medium mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="social-icons"
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-2 text-gray-300 mb-4 md:mb-0">
              <Award size={16} />
              <span className="text-sm">
                &copy; 2024 CivicSync - Government of Jharkhand. All rights reserved.
              </span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <span className="text-sm">Made with</span>
              <Heart size={16} className="text-red-500" />
              <span className="text-sm">for better communities</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;