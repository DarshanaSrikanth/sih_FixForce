import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Shield, 
  Award, 
  Building2, 
  Users, 
  Zap, 
  Globe,
  ArrowRight,
  Sparkles,
  Star,
  Crown,
  Target,
  Heart
} from 'lucide-react';

const IntroPage = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [languageChanged, setLanguageChanged] = useState(false);

  const slogans = [
    {
      en: "Syncing Citizens and Government for a Smarter Jharkhand",
      hi: "बेहतर झारखंड के लिए नागरिकों और सरकार को जोड़ना"
    },
    {
      en: "AI-Powered Civic Excellence",
      hi: "AI-संचालित नागरिक उत्कृष्टता"
    },
    {
      en: "Transforming Governance Through Technology",
      hi: "प्रौद्योगिकी के माध्यम से शासन को बदलना"
    },
    {
      en: "Building Tomorrow's Smart Cities Today",
      hi: "आज कल के स्मार्ट शहरों का निर्माण"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Rotate slogans every 3 seconds
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log('IntroPage: Language changed to', language);
    setLanguageChanged(true);
    setTimeout(() => setLanguageChanged(false), 1000);
  }, [language]);

  // Show language change notification
  useEffect(() => {
    if (languageChanged) {
      const notification = document.createElement('div');
      notification.className = 'fixed top-20 right-6 bg-accent-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300';
      notification.textContent = language === 'hi' ? 'भाषा बदली गई' : 'Language Changed';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 2000);
    }
  }, [languageChanged, language]);

  const handleClick = () => {
    console.log('IntroPage: handleClick called, navigating to /admin-login');
    try {
      navigate('/admin-login');
      console.log('IntroPage: Navigation called successfully');
    } catch (error) {
      console.error('IntroPage: Navigation error:', error);
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Secure Admin Portal",
      titleHindi: "सुरक्षित एडमिन पोर्टल",
      description: "Government-grade security and authentication",
      descriptionHindi: "सरकारी ग्रेड सुरक्षा और प्रमाणीकरण"
    },
    {
      icon: Zap,
      title: "AI-Powered Management",
      titleHindi: "AI-संचालित प्रबंधन",
      description: "Smart issue classification and prioritization",
      descriptionHindi: "स्मार्ट समस्या वर्गीकरण और प्राथमिकता"
    },
    {
      icon: Users,
      title: "Team Coordination",
      titleHindi: "टीम समन्वय",
      description: "Seamless employee assignment and tracking",
      descriptionHindi: "निर्बाध कर्मचारी असाइनमेंट और ट्रैकिंग"
    },
    {
      icon: Target,
      title: "Real-time Analytics",
      titleHindi: "रियल-टाइम विश्लेषण",
      description: "Performance insights and data-driven decisions",
      descriptionHindi: "प्रदर्शन अंतर्दृष्टि और डेटा-संचालित निर्णय"
    }
  ];

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 relative overflow-hidden cursor-pointer"
      onClick={(e) => {
        console.log('IntroPage: Container clicked');
        handleClick();
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-secondary-400/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-primary-400/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-accent-400/20 rounded-full blur-xl animate-pulse delay-3000"></div>
        
        {/* Click Anywhere Overlay Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-bounce delay-500">
          <Building2 size={24} className="text-white/30" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-bounce delay-1000">
          <Globe size={20} className="text-white/30" />
        </div>
        <div className="absolute bottom-1/3 left-1/5 animate-bounce delay-1500">
          <Star size={18} className="text-white/30" />
        </div>
        <div className="absolute bottom-1/4 right-1/3 animate-bounce delay-2000">
          <Heart size={22} className="text-white/30" />
        </div>
      </div>

      {/* Language Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            const newLang = language === 'en' ? 'hi' : 'en';
            console.log('Changing language from', language, 'to', newLang);
            changeLanguage(newLang);
          }}
          className={`bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center space-x-2 ${
            languageChanged ? 'ring-2 ring-accent-400 ring-opacity-50' : ''
          }`}
        >
          <Globe size={16} />
          <span className="font-medium">{language === 'en' ? 'हिंदी' : 'English'}</span>
          <span className="text-xs opacity-75">({language})</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className={`max-w-6xl mx-auto text-center transition-all duration-2000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Logo and Brand */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Shield size={40} className="text-primary-800" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent-400 rounded-full flex items-center justify-center">
                  <Crown size={16} className="text-white" />
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-6xl font-bold text-white mb-2 text-hindi">
                  CivicSync
                </h1>
                <div className="flex items-center space-x-2">
                  <Sparkles size={20} className="text-accent-400" />
                  <span className="text-xl text-primary-200 font-medium">सिविकसिंक</span>
                  <Sparkles size={20} className="text-accent-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Slogan */}
          <div className="mb-16">
            <div className="h-20 flex items-center justify-center">
              <h2 className={`text-3xl md:text-4xl font-bold text-white transition-all duration-1000 text-hindi ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                {language === 'hi' ? slogans[currentSlogan].hi : slogans[currentSlogan].en}
              </h2>
            </div>
            <div className="flex justify-center space-x-2 mt-4">
              {slogans.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlogan ? 'bg-accent-400 w-8' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Government Badge */}
          <div className="mb-16">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <Award size={24} className="text-accent-400" />
              <span className="text-white font-semibold">Government of Jharkhand</span>
              <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 text-hindi">
                    {language === 'hi' ? feature.titleHindi : feature.title}
                  </h3>
                  <p className="text-primary-200 text-sm text-hindi">
                    {language === 'hi' ? feature.descriptionHindi : feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="mb-12">
            <button
              onClick={(e) => {
                console.log('IntroPage: Button clicked');
                e.stopPropagation();
                handleClick();
              }}
              className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-accent-500/25"
            >
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Shield size={24} />
              <span className="text-lg">Access Admin Portal</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Click Anywhere Hint */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 inline-block mb-4">
              <p className="text-white text-sm font-medium text-hindi">
                {language === 'hi' ? 'जारी रखने के लिए कहीं भी क्लिक करें' : 'Click anywhere to continue'}
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-8 h-8 border-2 border-white/50 rounded-full flex items-center justify-center animate-bounce">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-2xl font-bold">15,847</div>
              <div className="text-sm text-primary-200">Issues Resolved</div>
            </div>
            <div className="text-white">
              <div className="text-2xl font-bold">94.3%</div>
              <div className="text-sm text-primary-200">Success Rate</div>
            </div>
            <div className="text-white">
              <div className="text-2xl font-bold">4.2hrs</div>
              <div className="text-sm text-primary-200">Avg Response</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
