import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  User, 
  Lock,
  Building2,
  Award
} from 'lucide-react';

const AdminLogin = () => {
  console.log('AdminLogin: Component rendered');
  
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const { login } = useAdminAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    department: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const departments = [
    { id: 'super_admin', name: 'Super Admin', nameHindi: 'सुपर एडमिन' },
    { id: 'roads', name: 'Roads & Potholes', nameHindi: 'सड़क और गड्ढे' },
    { id: 'waste', name: 'Waste Management', nameHindi: 'अपशिष्ट प्रबंधन' },
    { id: 'lighting', name: 'Street Lighting', nameHindi: 'स्ट्रीट लाइटिंग' },
    { id: 'water', name: 'Water Supply', nameHindi: 'जल आपूर्ति' },
    { id: 'drainage', name: 'Drainage', nameHindi: 'जल निकासी' },
    { id: 'electricity', name: 'Electricity', nameHindi: 'बिजली' },
    { id: 'parks', name: 'Public Parks', nameHindi: 'सार्वजनिक पार्क' },
    { id: 'transport', name: 'Public Transport', nameHindi: 'सार्वजनिक परिवहन' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('AdminLogin: Form submitted with data:', formData);
    setIsLoading(true);

    try {
      // Use the AdminAuth context login function
      const success = login(formData.department, formData.username, formData.password);
      
      if (success) {
        console.log('AdminLogin: Login successful, navigating to dashboard');
        setIsLoading(false);
        navigate('/dashboard');
      } else {
        console.log('AdminLogin: Login failed');
        setIsLoading(false);
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('AdminLogin: Login error:', error);
      setIsLoading(false);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Shield size={32} className="text-primary-800" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white text-hindi">
                CivicSync Admin
              </h1>
              <p className="text-primary-200 text-sm">
                Government of Jharkhand
              </p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 text-hindi">
            Admin Portal Access
          </h2>
          <p className="text-primary-200 text-hindi">
            Secure login for government administrators
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Department Selection */}
            <div>
              <label className="form-label">
                <Building2 size={16} className="inline mr-2" />
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
                className="form-input"
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {language === 'hi' ? dept.nameHindi : dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Username */}
            <div>
              <label className="form-label">
                <User size={16} className="inline mr-2" />
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="Enter your username"
              />
            </div>

            {/* Password */}
            <div>
              <label className="form-label">
                <Lock size={16} className="inline mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="form-input pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-gray-400" />
                  ) : (
                    <Eye size={20} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="spinner w-5 h-5"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Shield size={20} />
                  <span>Access Admin Portal</span>
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Award size={16} className="text-primary-600" />
              <span className="text-sm font-medium text-primary-800">Security Notice</span>
            </div>
            <p className="text-sm text-primary-700 mt-1">
              This is a secure government portal. All activities are logged and monitored.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-primary-200 text-sm">
            © 2024 Government of Jharkhand. All rights reserved.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
