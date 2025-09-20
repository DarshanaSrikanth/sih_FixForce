import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Database,
  Save,
  Eye,
  EyeOff,
  Key,
  Mail,
  Phone
} from 'lucide-react';

const Settings = ({ showNotification }) => {
  const { language, t, changeLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      name: 'Admin User',
      email: 'admin@jharkhand.gov.in',
      phone: '+91 98765 43210',
      department: 'Super Admin',
      role: 'Administrator'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      newIssueAlerts: true,
      statusUpdates: true,
      priorityEscalations: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 3
    },
    system: {
      autoRefresh: true,
      refreshInterval: 30,
      theme: 'light',
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY'
    }
  });

  const tabs = [
    { id: 'profile', name: 'Profile', nameHindi: 'प्रोफाइल', icon: User },
    { id: 'notifications', name: 'Notifications', nameHindi: 'सूचनाएं', icon: Bell },
    { id: 'security', name: 'Security', nameHindi: 'सुरक्षा', icon: Shield },
    { id: 'system', name: 'System', nameHindi: 'सिस्टम', icon: SettingsIcon },
    { id: 'language', name: 'Language', nameHindi: 'भाषा', icon: Globe }
  ];

  const handleSave = (section) => {
    showNotification(`${section} settings saved successfully`, 'success');
  };

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-primary-800 rounded-full flex items-center justify-center">
          <User size={32} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{settings.profile.name}</h3>
          <p className="text-gray-600">{settings.profile.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Full Name</label>
          <input
            type="text"
            value={settings.profile.name}
            onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Email Address</label>
          <div className="relative">
            <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={settings.profile.email}
              onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
              className="form-input pl-10"
            />
          </div>
        </div>
        <div>
          <label className="form-label">Phone Number</label>
          <div className="relative">
            <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              value={settings.profile.phone}
              onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
              className="form-input pl-10"
            />
          </div>
        </div>
        <div>
          <label className="form-label">Department</label>
          <input
            type="text"
            value={settings.profile.department}
            onChange={(e) => handleInputChange('profile', 'department', e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('Profile')}
          className="btn-primary flex items-center space-x-2"
        >
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
        
        {Object.entries(settings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </h4>
              <p className="text-sm text-gray-600">
                {key === 'emailNotifications' && 'Receive notifications via email'}
                {key === 'pushNotifications' && 'Receive push notifications in browser'}
                {key === 'smsNotifications' && 'Receive SMS notifications'}
                {key === 'newIssueAlerts' && 'Get notified about new issues'}
                {key === 'statusUpdates' && 'Get notified about status changes'}
                {key === 'priorityEscalations' && 'Get notified about priority escalations'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('Notification')}
          className="btn-primary flex items-center space-x-2"
        >
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.twoFactorAuth}
                onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Session Timeout (minutes)</label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
              className="form-input"
              min="5"
              max="120"
            />
          </div>
          <div>
            <label className="form-label">Password Expiry (days)</label>
            <input
              type="number"
              value={settings.security.passwordExpiry}
              onChange={(e) => handleInputChange('security', 'passwordExpiry', parseInt(e.target.value))}
              className="form-input"
              min="30"
              max="365"
            />
          </div>
        </div>

        <div className="p-4 bg-alert-50 border border-alert-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Key size={20} className="text-alert-600" />
            <h4 className="font-medium text-alert-800">Change Password</h4>
          </div>
          <p className="text-sm text-alert-700 mt-1">Update your password to keep your account secure</p>
          <button className="mt-3 text-sm text-alert-600 hover:text-alert-800 font-medium">
            Change Password
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('Security')}
          className="btn-primary flex items-center space-x-2"
        >
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );

  const renderSystemTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">System Preferences</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Auto Refresh</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.system.autoRefresh}
                onChange={(e) => handleInputChange('system', 'autoRefresh', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          <div>
            <label className="form-label">Refresh Interval (seconds)</label>
            <input
              type="number"
              value={settings.system.refreshInterval}
              onChange={(e) => handleInputChange('system', 'refreshInterval', parseInt(e.target.value))}
              className="form-input"
              min="10"
              max="300"
            />
          </div>
          <div>
            <label className="form-label">Theme</label>
            <select
              value={settings.system.theme}
              onChange={(e) => handleInputChange('system', 'theme', e.target.value)}
              className="form-input"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <div>
            <label className="form-label">Timezone</label>
            <select
              value={settings.system.timezone}
              onChange={(e) => handleInputChange('system', 'timezone', e.target.value)}
              className="form-input"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('System')}
          className="btn-primary flex items-center space-x-2"
        >
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );

  const renderLanguageTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Language Settings</h3>
        
        <div className="p-6 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Interface Language</h4>
              <p className="text-sm text-gray-600">Choose your preferred language for the interface</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => changeLanguage('en')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  language === 'en' 
                    ? 'bg-primary-800 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                English
              </button>
              <button
                onClick={() => changeLanguage('hi')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  language === 'hi' 
                    ? 'bg-primary-800 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Globe size={20} className="text-primary-600" />
            <h4 className="font-medium text-primary-800">Current Language</h4>
          </div>
          <p className="text-sm text-primary-700 mt-1">
            Interface is currently displayed in {language === 'en' ? 'English' : 'Hindi (हिंदी)'}
          </p>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'notifications': return renderNotificationsTab();
      case 'security': return renderSecurityTab();
      case 'system': return renderSystemTab();
      case 'language': return renderLanguageTab();
      default: return renderProfileTab();
    }
  };

  return (
    <div className="settings-page">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <SettingsIcon size={32} className="text-primary-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 text-hindi">
                {t('nav.settings')}
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your account settings and preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-hindi">
                      {language === 'hi' ? tab.nameHindi : tab.name}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="card">
              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
