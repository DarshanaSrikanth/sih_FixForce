import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { AdminAuthProvider } from './contexts/AdminAuthContext'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import IntroPage from './pages/IntroPage'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import Issues from './pages/Issues'
import Employees from './pages/Employees'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import Notification from './components/Notification'

function App() {
  const [notification, setNotification] = useState(null)

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <LanguageProvider>
      <AdminAuthProvider>
        <div className="App min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<IntroPage />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            
            {/* Protected Admin Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Navigation />
                <main className="flex-1">
                  <Dashboard showNotification={showNotification} />
                </main>
                <Footer />
              </ProtectedRoute>
            } />
            
            <Route path="/issues" element={
              <ProtectedRoute>
                <Navigation />
                <main className="flex-1">
                  <Issues showNotification={showNotification} />
                </main>
                <Footer />
              </ProtectedRoute>
            } />
            
            <Route path="/employees" element={
              <ProtectedRoute>
                <Navigation />
                <main className="flex-1">
                  <Employees showNotification={showNotification} />
                </main>
                <Footer />
              </ProtectedRoute>
            } />
            
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Navigation />
                <main className="flex-1">
                  <Analytics showNotification={showNotification} />
                </main>
                <Footer />
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <Navigation />
                <main className="flex-1">
                  <Settings showNotification={showNotification} />
                </main>
                <Footer />
              </ProtectedRoute>
            } />
          </Routes>
          
          {notification && (
            <Notification 
              message={notification.message} 
              type={notification.type}
              onClose={() => setNotification(null)}
            />
          )}
        </div>
      </AdminAuthProvider>
    </LanguageProvider>
  )
}

export default App
