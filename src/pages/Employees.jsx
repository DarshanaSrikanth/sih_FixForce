import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockEmployees } from '../data/mockData';
import { 
  Search, 
  Filter, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Star,
  Clock,
  Award,
  UserPlus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

const Employees = ({ showNotification }) => {
  const { language, t } = useLanguage();
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'list' or 'grid'

  const departments = [
    { id: 'all', name: 'All Departments', nameHindi: 'सभी विभाग' },
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
    { id: 'available', name: 'Available', nameHindi: 'उपलब्ध' },
    { id: 'busy', name: 'Busy', nameHindi: 'व्यस्त' },
    { id: 'offline', name: 'Offline', nameHindi: 'ऑफलाइन' }
  ];

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || employee.status === selectedStatus;
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.nameHindi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-success-100 text-success-800 border-success-200';
      case 'busy': return 'bg-warning-100 text-warning-800 border-warning-200';
      case 'offline': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'offline': return 'Offline';
      default: return status;
    }
  };

  const getDepartmentName = (departmentId) => {
    const dept = departments.find(d => d.id === departmentId);
    return language === 'hi' ? dept?.nameHindi : dept?.name;
  };

  const handleViewProfile = (employeeId) => {
    showNotification(`Opening profile for employee ${employeeId}`, 'info');
  };

  const handleEditEmployee = (employeeId) => {
    showNotification(`Editing employee ${employeeId}`, 'info');
  };

  const handleDeleteEmployee = (employeeId) => {
    showNotification(`Deleting employee ${employeeId}`, 'warning');
  };

  const handleAddEmployee = () => {
    showNotification('Opening add employee form', 'info');
  };

  return (
    <div className="employees-page">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 text-hindi">
                {t('nav.employees')}
              </h1>
              <p className="text-gray-600 mt-1">
                Manage field workers and staff members
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddEmployee}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-800 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                <UserPlus size={20} />
                <span>Add Employee</span>
              </button>
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
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
            
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="form-input"
            >
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {language === 'hi' ? dept.nameHindi : dept.name}
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
              <User size={16} />
              <span>Total: {filteredEmployees.length} employees</span>
            </div>
          </div>
        </div>

        {/* Employees List/Grid */}
        {viewMode === 'list' ? (
          <div className="bg-white rounded-xl shadow-government">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Employees List ({filteredEmployees.length})
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <div key={employee.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-primary-800 rounded-full flex items-center justify-center">
                        <User size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {language === 'hi' ? employee.nameHindi : employee.name}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(employee.status)}`}>
                            {getStatusText(employee.status)}
                          </span>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <MapPin size={14} />
                            <span>{employee.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Award size={14} />
                            <span>{employee.experience}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star size={14} className="text-yellow-500" />
                            <span>{employee.rating}/5.0</span>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-3">
                          <strong>Department:</strong> {getDepartmentName(employee.department)}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {employee.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full"
                            >
                              {language === 'hi' ? employee.skillsHindi[index] : skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Phone size={14} />
                            <span>{employee.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Mail size={14} />
                            <span>{employee.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <button
                        onClick={() => handleViewProfile(employee.id)}
                        className="flex items-center space-x-2 px-3 py-2 bg-primary-800 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm font-medium"
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => handleEditEmployee(employee.id)}
                        className="flex items-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
                      >
                        <Edit size={16} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(employee.id)}
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

            {filteredEmployees.length === 0 && (
              <div className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <User size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="card-hover text-center">
                <div className="w-20 h-20 bg-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={32} className="text-white" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === 'hi' ? employee.nameHindi : employee.name}
                </h3>

                <div className="flex items-center justify-center space-x-2 mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(employee.status)}`}>
                    {getStatusText(employee.status)}
                  </span>
                </div>

                <p className="text-gray-700 mb-3">
                  <strong>Department:</strong> {getDepartmentName(employee.department)}
                </p>

                <div className="flex items-center justify-center space-x-1 mb-3">
                  <Star size={16} className="text-yellow-500" />
                  <span className="text-sm font-medium">{employee.rating}/5.0</span>
                  <span className="text-sm text-gray-600">({employee.experience})</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4 justify-center">
                  {employee.skills.slice(0, 2).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full"
                    >
                      {language === 'hi' ? employee.skillsHindi[index] : skill}
                    </span>
                  ))}
                  {employee.skills.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      +{employee.skills.length - 2} more
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center justify-center space-x-1">
                    <MapPin size={14} />
                    <span>{employee.location}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Phone size={14} />
                    <span>{employee.phone}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewProfile(employee.id)}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-primary-800 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm font-medium"
                  >
                    <Eye size={16} />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleEditEmployee(employee.id)}
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

export default Employees;
