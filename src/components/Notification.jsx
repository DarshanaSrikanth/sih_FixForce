import React from 'react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

const Notification = ({ message, type = 'info', onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-success-600" />;
      case 'error':
        return <AlertTriangle size={20} className="text-alert-600" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-warning-600" />;
      default:
        return <Info size={20} className="text-primary-600" />;
    }
  };

  const getToastClass = () => {
    switch (type) {
      case 'success':
        return 'toast-success';
      case 'error':
        return 'toast-error';
      case 'warning':
        return 'toast-warning';
      default:
        return 'toast-info';
    }
  };

  return (
    <div className={`toast ${getToastClass()} animate-slide-up`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;

