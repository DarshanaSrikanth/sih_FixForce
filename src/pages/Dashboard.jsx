import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { mockIssues, mockStats } from '../data/mockData';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Users, 
  MapPin, 
  Eye, 
  UserPlus,
  Filter,
  Search,
  Calendar,
  TrendingUp,
  Activity
} from 'lucide-react';

const Dashboard = ({ showNotification }) => {
  const { language, t } = useLanguage();
  const { admin, isSuperAdmin } = useAdminAuth();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIssues = mockIssues.filter(issue => {
    const matchesFilter = selectedFilter === 'all' || issue.status === selectedFilter;
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.area.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = isSuperAdmin() || issue.category === admin?.department;
    return matchesFilter && matchesSearch && matchesDepartment;
  });

  const getPriorityColor = (score) => {
    if (score >= 90) return 'priority-high';
    if (score >= 70) return 'priority-medium';
    return 'priority-low';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending_assignment': return 'status-pending';
      case 'assigned': return 'status-assigned';
      case 'in_progress': return 'status-in-progress';
      case 'resolved': return 'status-resolved';
      case 'closed': return 'status-closed';
      default: return 'status-pending';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending_assignment': return t('status.reported');
      case 'assigned': return t('status.assigned');
      case 'in_progress': return t('status.in_progress');
      case 'resolved': return t('status.resolved');
      case 'closed': return t('status.closed');
      default: return status;
    }
  };

  const handleAssignWorkers = (issueId) => {
    showNotification(`Assigning workers for issue ${issueId}`, 'info');
  };

  const handleViewDetails = (issueId) => {
    showNotification(`Opening details for issue ${issueId}`, 'info');
  };

  return (
    <div className="dashboard-page">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-primary-800 to-secondary-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white text-hindi mb-2">
                {t('dashboard.title')}
              </h1>
              <p className="text-primary-200 text-lg text-hindi">
                {t('dashboard.welcome')}, {admin?.username}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
                <p className="text-sm text-primary-300">
                  {isSuperAdmin() ? 'Super Admin Portal' : `${admin?.department?.replace('_', ' ').toUpperCase()} Department`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <div className="flex items-center space-x-2 text-sm text-white">
                  <Activity size={16} />
                  <span>Last updated: 2 minutes ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 -mt-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-alert-600 mb-1">
                  {mockStats.highPriorityIssues}
                </div>
                <div className="text-sm text-gray-600 text-hindi">
                  {t('dashboard.metrics.high_priority')}
                </div>
              </div>
              <div className="bg-gradient-to-br from-alert-100 to-alert-200 p-4 rounded-2xl">
                <AlertTriangle size={28} className="text-alert-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-warning-600 mb-1">
                  {mockStats.mediumPriorityIssues}
                </div>
                <div className="text-sm text-gray-600 text-hindi">
                  {t('dashboard.metrics.medium_priority')}
                </div>
              </div>
              <div className="bg-gradient-to-br from-warning-100 to-warning-200 p-4 rounded-2xl">
                <Clock size={28} className="text-warning-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-success-600 mb-1">
                  {mockStats.lowPriorityIssues}
                </div>
                <div className="text-sm text-gray-600 text-hindi">
                  {t('dashboard.metrics.low_priority')}
                </div>
              </div>
              <div className="bg-gradient-to-br from-success-100 to-success-200 p-4 rounded-2xl">
                <CheckCircle size={28} className="text-success-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  {mockStats.resolvedToday}
                </div>
                <div className="text-sm text-gray-600 text-hindi">
                  {t('dashboard.metrics.resolved_today')}
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-4 rounded-2xl">
                <TrendingUp size={28} className="text-primary-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10 w-full sm:w-64"
                />
              </div>
              
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="form-input w-full sm:w-48"
              >
                <option value="all">All Status</option>
                <option value="pending_assignment">Pending Assignment</option>
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600">Today: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Priority-Based Issue List */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 text-hindi">
              {t('dashboard.issues.title')}
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredIssues.length} issues found
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredIssues.map((issue) => (
              <div key={issue.id} className="p-6 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-all duration-300 border-l-4 border-transparent hover:border-primary-400">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {language === 'hi' ? issue.titleHindi : issue.title}
                      </h3>
                      <span className={`issue-priority-score ${getPriorityColor(issue.priority_score)}`}>
                        {issue.priority_score}/100
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>{language === 'hi' ? issue.location.areaHindi : issue.location.area}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users size={14} />
                        <span>{issue.workers_needed} workers needed</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{issue.estimated_resolution}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-3 text-hindi">
                      {language === 'hi' ? issue.descriptionHindi : issue.description}
                    </p>

                    <div className="flex items-center space-x-2 mb-3">
                      {issue.special_tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full"
                        >
                          {t(`tag.${tag.toLowerCase()}`, tag)}
                        </span>
                      ))}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(issue.status)}`}>
                        {getStatusText(issue.status)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-6">
                    <button
                      onClick={() => handleAssignWorkers(issue.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <UserPlus size={16} />
                      <span>{t('dashboard.issues.assign_workers')}</span>
                    </button>
                    <button
                      onClick={() => handleViewDetails(issue.id)}
                      className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 text-sm font-medium"
                    >
                      <Eye size={16} />
                      <span>{t('dashboard.issues.view_details')}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredIssues.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Filter size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No issues found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
