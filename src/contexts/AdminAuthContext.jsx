import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing admin session
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      try {
        const sessionData = JSON.parse(adminSession);
        setAdmin(sessionData);
      } catch (error) {
        console.error('Error parsing admin session:', error);
        localStorage.removeItem('adminSession');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (department, username, password) => {
    // Mock authentication logic - you can change these credentials here
    const validCredentials = {
      username: 'admin',
      password: 'password'
    };

    // Check if credentials are valid
    if (username === validCredentials.username && password === validCredentials.password) {
      const adminData = {
        username,
        department,
        role: department === 'super_admin' ? 'Super Admin' : 'Department Admin',
        loginTime: new Date().toISOString()
      };
      
      setAdmin(adminData);
      localStorage.setItem('adminSession', JSON.stringify(adminData));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('adminSession');
  };

  const isAuthenticated = () => {
    return admin !== null;
  };

  const isSuperAdmin = () => {
    return admin?.department === 'super_admin';
  };

  const canAccessDepartment = (departmentId) => {
    if (isSuperAdmin()) return true;
    return admin?.department === departmentId;
  };

  const value = {
    admin,
    login,
    logout,
    isAuthenticated,
    isSuperAdmin,
    canAccessDepartment,
    isLoading
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export default AdminAuthContext;
