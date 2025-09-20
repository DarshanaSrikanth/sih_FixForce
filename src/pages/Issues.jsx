import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockIssues } from '../data/mockData';
import { 
  Filter, 
  Search, 
  MapPin, 
  Calendar, 
  User, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const Issues = ({ showNotification }) => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  const categories = [
    { id: 'all', name: 'All Categories', nameHindi: 'सभी श्रेणियां' },
    { id: 'roads', name: 'Roads & Potholes', nameHindi: 'सड़क और गड्ढे' },
    { id: 'waste', name: 'Waste Management', nameHindi: 'अपशिष्ट प्रबंधन' },
    { id: 'lighting', name: 'Street Lighting', nameHindi: 'स्ट्रीट लाइटिंग' },
    { id: 'water', name: 'Water Supply', nameHindi: 'जल आपूर्ति' },
    { id: 'drainage', name: 'Drainage', nameHindi: 'जल निकासी' },
    { id: 'electricity', name: 'Electricity', nameHindi: 'बिजली' },
    { id: 'parks', name: 'Public Parks', nameHindi: 'सार्वजनिक पार्क' },
    { id: 'transport', name: 'Public Transport', nameHindi: 'सार्वजनिक परिवहन' }
  ];

  const statuses = [
    { id: 'all', name: 'All Status', nameHindi: 'सभी स्थिति' },
    { id: 'pending_assignment', name: 'Pending Assignment', nameHindi: 'नियुक्ति लंबित' },
    { id: 'assigned', name: 'Assigned', nameHindi: 'नियुक्त' },
    { id: 'in_progress', name: 'In Progress', nameHindi: 'प्रगति में' },
    { id: 'resolved', name: 'Resolved', nameHindi: 'हल किया गया' },
    { id: 'closed', name: 'Closed', nameHindi: 'बंद किया गया' }
  ];

  const filteredIssues = mockIssues.filter(issue => {
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus;
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getPriorityColor = (score) => {
    if (score >= 90) return 'bg-alert-600 text-white';
    if (score >= 70) return 'bg-warning-600 text-white';
    return 'bg-success-600 text-white';
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

  const handleViewDetails = (issueId) => {
    showNotification(`Opening details for issue ${issueId}`, 'info');
  };

  const handleEditIssue = (issueId) => {
    showNotification(`Editing issue ${issueId}`, 'info');
  };

  const handleDeleteIssue = (issueId) => {
    showNotification(`Deleting issue ${issueId}`, 'warning');
  };

  return (
    <div className="issues-page">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 text-hindi">
                {t('nav.issues')}
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and track all civic issues
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-800' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Filter size={20} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-800' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <div className="grid grid-cols-2 gap-1 w-4 h-4">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-government p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-input"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {language === 'hi' ? category.nameHindi : category.name}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="form-input"
            >
              {statuses.map(status => (
                <option key={status.id} value={status.id}>
                  {language === 'hi' ? status.nameHindi : status.name}
                </option>
              ))}
            </select>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar size={16} />
              <span>Total: {filteredIssues.length} issues</span>
            </div>
          </div>
        </div>

        {/* Issues List/Grid */}
        {viewMode === 'list' ? (
          <div className="bg-white rounded-xl shadow-government">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Issues List ({filteredIssues.length})
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredIssues.map((issue) => (
                <div key={issue.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {language === 'hi' ? issue.titleHindi : issue.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(issue.priority_score)}`}>
                          {issue.priority_score}/100
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(issue.status)}`}>
                          {getStatusText(issue.status)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{language === 'hi' ? issue.location.areaHindi : issue.location.area}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User size={14} />
                          <span>ID: {issue.id}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{new Date(issue.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3 text-hindi">
                        {language === 'hi' ? issue.descriptionHindi : issue.description}
                      </p>

                      <div className="flex items-center space-x-2">
                        {issue.special_tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full"
                          >
                            {t(`tag.${tag.toLowerCase()}`, tag)}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <button
                        onClick={() => handleViewDetails(issue.id)}
                        className="flex items-center space-x-2 px-3 py-2 bg-primary-800 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm font-medium"
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => handleEditIssue(issue.id)}
                        className="flex items-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
                      >
                        <Edit size={16} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteIssue(issue.id)}
                        className="flex items-center space-x-2 px-3 py-2 border border-alert-300 text-alert-700 rounded-lg hover:bg-alert-50 transition-colors duration-200 text-sm font-medium"
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIssues.map((issue) => (
              <div key={issue.id} className="card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {language === 'hi' ? issue.titleHindi : issue.title}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(issue.priority_score)}`}>
                        {issue.priority_score}/100
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(issue.status)}`}>
                        {getStatusText(issue.status)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin size={14} />
                    <span>{language === 'hi' ? issue.location.areaHindi : issue.location.area}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User size={14} />
                    <span>ID: {issue.id}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock size={14} />
                    <span>{new Date(issue.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 text-hindi">
                  {language === 'hi' ? issue.descriptionHindi : issue.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {issue.special_tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full"
                    >
                      {t(`tag.${tag.toLowerCase()}`, tag)}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewDetails(issue.id)}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-primary-800 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm font-medium"
                  >
                    <Eye size={16} />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleEditIssue(issue.id)}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
                  >
                    <Edit size={16} />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Issues;
