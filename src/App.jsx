import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Issues from './pages/Issues'
import Employees from './pages/Employees'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import ReportIssue from './pages/ReportIssue'
import TrackIssue from './pages/TrackIssue'
import AdminDashboard from './pages/AdminDashboard'
import About from './pages/About'
import Contact from './pages/Contact'
import Notification from './components/Notification'

function App() {
  const [notification, setNotification] = useState(null)

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <LanguageProvider>
      <div className="App min-h-screen bg-gray-50">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home showNotification={showNotification} />} />
            <Route path="/dashboard" element={<Dashboard showNotification={showNotification} />} />
            <Route path="/issues" element={<Issues showNotification={showNotification} />} />
            <Route path="/employees" element={<Employees showNotification={showNotification} />} />
            <Route path="/analytics" element={<Analytics showNotification={showNotification} />} />
            <Route path="/settings" element={<Settings showNotification={showNotification} />} />
            <Route path="/report" element={<ReportIssue showNotification={showNotification} />} />
            <Route path="/track" element={<TrackIssue showNotification={showNotification} />} />
            <Route path="/admin" element={<AdminDashboard showNotification={showNotification} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact showNotification={showNotification} />} />
          </Routes>
        </main>
        <Footer />
        {notification && (
          <Notification 
            message={notification.message} 
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </LanguageProvider>
  )
}

export default App
