import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockAnalytics } from '../data/mockData';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MapPin, 
  Clock, 
  Award,
  Activity,
  Target,
  PieChart,
  LineChart
} from 'lucide-react';

const Analytics = ({ showNotification }) => {
  const { language, t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  const periods = [
    { id: '1week', name: 'Last Week', nameHindi: 'पिछले सप्ताह' },
    { id: '1month', name: 'Last Month', nameHindi: 'पिछले महीने' },
    { id: '3months', name: 'Last 3 Months', nameHindi: 'पिछले 3 महीने' },
    { id: '6months', name: 'Last 6 Months', nameHindi: 'पिछले 6 महीने' },
    { id: '1year', name: 'Last Year', nameHindi: 'पिछले साल' }
  ];

  const keyMetrics = [
    {
      title: 'Total Issues Resolved',
      titleHindi: 'कुल हल की गई समस्याएं',
      value: '15,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: Target,
      color: 'text-success-600'
    },
    {
      title: 'Average Response Time',
      titleHindi: 'औसत प्रतिक्रिया समय',
      value: '4.2 hrs',
      change: '-8.3%',
      changeType: 'positive',
      icon: Clock,
      color: 'text-primary-600'
    },
    {
      title: 'Success Rate',
      titleHindi: 'सफलता दर',
      value: '94.3%',
      change: '+2.1%',
      changeType: 'positive',
      icon: Award,
      color: 'text-accent-600'
    },
    {
      title: 'Active Employees',
      titleHindi: 'सक्रिय कर्मचारी',
      value: '127',
      change: '+5.2%',
      changeType: 'positive',
      icon: Users,
      color: 'text-secondary-600'
    }
  ];

  const departmentPerformance = [
    { name: 'Waste Management', nameHindi: 'अपशिष्ट प्रबंधन', resolved: 67, pending: 8, efficiency: 89.3 },
    { name: 'Roads & Potholes', nameHindi: 'सड़क और गड्ढे', resolved: 45, pending: 7, efficiency: 86.5 },
    { name: 'Street Lighting', nameHindi: 'स्ट्रीट लाइटिंग', resolved: 32, pending: 4, efficiency: 88.9 },
    { name: 'Water Supply', nameHindi: 'जल आपूर्ति', resolved: 28, pending: 4, efficiency: 87.5 },
    { name: 'Drainage', nameHindi: 'जल निकासी', resolved: 41, pending: 6, efficiency: 87.2 },
    { name: 'Electricity', nameHindi: 'बिजली', resolved: 23, pending: 3, efficiency: 88.5 },
    { name: 'Public Parks', nameHindi: 'सार्वजनिक पार्क', resolved: 15, pending: 2, efficiency: 88.2 },
    { name: 'Public Transport', nameHindi: 'सार्वजनिक परिवहन', resolved: 19, pending: 3, efficiency: 86.4 }
  ];

  return (
    <div className="analytics-page">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 text-hindi">
                {t('analytics.title')}
              </h1>
              <p className="text-gray-600 mt-1">
                Performance insights and data analytics
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="form-input w-48"
              >
                {periods.map(period => (
                  <option key={period.id} value={period.id}>
                    {language === 'hi' ? period.nameHindi : period.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {keyMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="metric-card">
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`metric-value ${metric.color}`}>
                      {metric.value}
                    </div>
                    <div className="metric-label text-hindi">
                      {language === 'hi' ? metric.titleHindi : metric.title}
                    </div>
                    <div className={`text-sm font-medium ${
                      metric.changeType === 'positive' ? 'text-success-600' : 'text-alert-600'
                    }`}>
                      {metric.change} from last period
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${
                    metric.color === 'text-success-600' ? 'bg-success-100' :
                    metric.color === 'text-primary-600' ? 'bg-primary-100' :
                    metric.color === 'text-accent-600' ? 'bg-accent-100' :
                    'bg-secondary-100'
                  }`}>
                    <Icon size={24} className={metric.color} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Resolution Trends */}
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <LineChart size={20} className="text-primary-600" />
                <h3 className="text-lg font-semibold text-gray-900 text-hindi">
                  {t('analytics.resolution_trends')}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 size={48} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Resolution trends chart would be displayed here</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Integration with Recharts or Chart.js for interactive charts
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <PieChart size={20} className="text-secondary-600" />
                <h3 className="text-lg font-semibold text-gray-900 text-hindi">
                  {t('analytics.category_distribution')}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <PieChart size={48} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Category distribution pie chart would be displayed here</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Interactive pie chart showing issue categories
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Department Performance */}
        <div className="card mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Activity size={20} className="text-accent-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Department Performance
              </h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resolved
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pending
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Efficiency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {departmentPerformance.map((dept, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 text-hindi">
                        {language === 'hi' ? dept.nameHindi : dept.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{dept.resolved}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{dept.pending}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{dept.efficiency}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        dept.efficiency >= 88 ? 'bg-success-100 text-success-800' :
                        dept.efficiency >= 85 ? 'bg-warning-100 text-warning-800' :
                        'bg-alert-100 text-alert-800'
                      }`}>
                        {dept.efficiency >= 88 ? 'Excellent' :
                         dept.efficiency >= 85 ? 'Good' : 'Needs Improvement'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Employee Efficiency */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Users size={20} className="text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900 text-hindi">
                {t('analytics.employee_efficiency')}
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockAnalytics.employeeEfficiency.map((employee, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-600">{employee.tasksCompleted} tasks completed</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star size={16} className="text-yellow-500" />
                        <span className="font-medium text-gray-900">{employee.rating}</span>
                      </div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${(employee.rating / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
