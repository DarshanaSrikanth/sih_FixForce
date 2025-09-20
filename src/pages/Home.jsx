import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { mockStats, mockCategories } from '../data/mockData';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  MapPin,
  Camera,
  Brain,
  Eye,
  Award,
  Shield,
  Zap
} from 'lucide-react';

const Home = ({ showNotification }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const { language, t } = useLanguage();

  const handleReportIssue = () => {
    if (selectedCategory) {
      showNotification('Redirecting to issue reporting...', 'info');
      // Navigate to report page with selected category
    } else {
      showNotification('Please select a category first', 'warning');
    }
  };

  const features = [
    {
      icon: Camera,
      title: t('landing.features.ai'),
      titleHindi: 'AI-संचालित समस्या वर्गीकरण',
      description: 'Advanced AI automatically classifies issues for faster processing',
      descriptionHindi: 'उन्नत AI स्वचालित रूप से तेजी से प्रसंस्करण के लिए समस्याओं को वर्गीकृत करता है'
    },
    {
      icon: TrendingUp,
      title: t('landing.features.priority'),
      titleHindi: 'रियल-टाइम प्राथमिकता स्कोरिंग',
      description: 'Smart prioritization ensures critical issues are addressed first',
      descriptionHindi: 'स्मार्ट प्राथमिकता सुनिश्चित करती है कि महत्वपूर्ण समस्याओं को पहले संबोधित किया जाए'
    },
    {
      icon: Zap,
      title: t('landing.features.workflow'),
      titleHindi: 'स्वचालित वर्कफ्लो प्रबंधन',
      description: 'Automated workflow streamlines issue resolution process',
      descriptionHindi: 'स्वचालित वर्कफ्लो समस्या समाधान प्रक्रिया को सुव्यवस्थित करता है'
    },
    {
      icon: Users,
      title: t('landing.features.coordination'),
      titleHindi: 'बहु-विभागीय समन्वय',
      description: 'Seamless coordination between different government departments',
      descriptionHindi: 'विभिन्न सरकारी विभागों के बीच निर्बाध समन्वय'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Report Issue',
      titleHindi: 'समस्या रिपोर्ट करें',
      description: 'Take a photo and provide details about the civic issue',
      descriptionHindi: 'एक फोटो लें और नागरिक समस्या के बारे में विवरण प्रदान करें',
      icon: Camera
    },
    {
      number: 2,
      title: 'AI Processing',
      titleHindi: 'AI प्रसंस्करण',
      description: 'AI automatically classifies and prioritizes your issue',
      descriptionHindi: 'AI स्वचालित रूप से आपकी समस्या को वर्गीकृत और प्राथमिकता देता है',
      icon: Brain
    },
    {
      number: 3,
      title: 'Track Progress',
      titleHindi: 'प्रगति ट्रैक करें',
      description: 'Monitor resolution progress and get notified when fixed',
      descriptionHindi: 'समाधान प्रगति की निगरानी करें और ठीक होने पर सूचना प्राप्त करें',
      icon: Eye
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="hero-title text-hindi">
              {t('landing.title')}
            </h1>
            <p className="hero-subtitle text-hindi">
              {t('landing.tagline')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/report" className="cta-button">
                Report an Issue
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link to="/track" className="btn-outline text-white border-white hover:bg-white hover:text-primary-800">
                Track Issue
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="metric-card">
              <div className="metric-value text-primary-800">
                {mockStats.totalIssuesResolved.toLocaleString()}
              </div>
              <div className="metric-label text-hindi">
                {t('landing.stats.resolved')}
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-value text-secondary-800">
                {mockStats.activeCases.toLocaleString()}
              </div>
              <div className="metric-label text-hindi">
                {t('landing.stats.active')}
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-value text-accent-600">
                {mockStats.responseTime}
              </div>
              <div className="metric-label text-hindi">
                {t('landing.stats.response')}
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-value text-success-600">
                {mockStats.successRate}
              </div>
              <div className="metric-label text-hindi">
                {t('landing.stats.success')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Select Department Category
            </h2>
            <p className="text-lg text-gray-600 text-hindi">
              Choose the type of civic issue you want to report
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {mockCategories.map((category) => (
              <div 
                key={category.id} 
                className={`card-hover text-center cursor-pointer transition-all duration-200 ${
                  selectedCategory === category.id ? 'ring-2 ring-primary-500 bg-primary-50' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className={`${category.color} text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl mx-auto mb-4`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {language === 'hi' ? category.nameHindi : category.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {category.issuesCount} issues
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button 
              className="btn-primary text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleReportIssue}
              disabled={!selectedCategory}
            >
              Report Issue
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 text-hindi">
              Simple steps to report and track civic issues
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="text-center">
                  <div className="bg-primary-800 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    {step.number}
                  </div>
                  <div className="bg-primary-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Icon size={32} className="text-primary-800" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-hindi">
                    {language === 'hi' ? step.titleHindi : step.title}
                  </h3>
                  <p className="text-gray-600 text-hindi">
                    {language === 'hi' ? step.descriptionHindi : step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 text-hindi">
              Advanced technology for efficient civic management
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card text-center">
                  <div className="bg-gradient-to-br from-primary-800 to-secondary-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 text-hindi">
                    {language === 'hi' ? feature.titleHindi : feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm text-hindi">
                    {language === 'hi' ? feature.descriptionHindi : feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Government Trust Section */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-8">
            <Shield size={48} className="text-white mr-4" />
            <Award size={48} className="text-accent-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-hindi">
            Trusted by Government of Jharkhand
          </h2>
          <p className="text-xl opacity-90 mb-8 text-hindi">
            Official civic issue reporting and resolution system
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="bg-white text-primary-800 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Admin Dashboard
            </Link>
            <Link to="/analytics" className="border-2 border-white text-white hover:bg-white hover:text-primary-800 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              View Analytics
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;