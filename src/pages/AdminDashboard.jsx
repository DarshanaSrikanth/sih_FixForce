import React, { useState } from 'react'

const AdminDashboard = ({ showNotification }) => {
  const [issues, setIssues] = useState([
    {
      id: 'FF12345678',
      category: 'Road Damage',
      description: 'Large pothole on Main Street near the intersection',
      location: 'Main Street, Downtown',
      status: 'In Progress',
      priority: 'High',
      submittedDate: '2024-01-15',
      assignedTo: 'John Smith',
      reporter: 'john.doe@email.com'
    },
    {
      id: 'FF87654321',
      category: 'Garbage',
      description: 'Overflowing trash bins in the park',
      location: 'Central Park',
      status: 'Resolved',
      priority: 'Medium',
      submittedDate: '2024-01-10',
      assignedTo: 'Sarah Johnson',
      reporter: 'jane.smith@email.com'
    },
    {
      id: 'FF11223344',
      category: 'Water Leakage',
      description: 'Water leak from broken pipe on Oak Avenue',
      location: 'Oak Avenue, Residential Area',
      status: 'Under Review',
      priority: 'High',
      submittedDate: '2024-01-18',
      assignedTo: 'Mike Wilson',
      reporter: 'mike.brown@email.com'
    },
    {
      id: 'FF55667788',
      category: 'Streetlight',
      description: 'Non-functioning streetlight on Pine Street',
      location: 'Pine Street, Commercial District',
      status: 'Submitted',
      priority: 'Medium',
      submittedDate: '2024-01-19',
      assignedTo: 'Not Assigned',
      reporter: 'sarah.davis@email.com'
    }
  ])

  const [filterStatus, setFilterStatus] = useState('All')
  const [filterCategory, setFilterCategory] = useState('All')

  const statusOptions = ['All', 'Submitted', 'Under Review', 'In Progress', 'Resolved']
  const categoryOptions = ['All', 'Garbage', 'Road Damage', 'Water Leakage', 'Streetlight', 'Others']
  const employees = ['John Smith', 'Sarah Johnson', 'Mike Wilson', 'Lisa Brown', 'David Lee']

  const filteredIssues = issues.filter(issue => {
    const statusMatch = filterStatus === 'All' || issue.status === filterStatus
    const categoryMatch = filterCategory === 'All' || issue.category === filterCategory
    return statusMatch && categoryMatch
  })

  const updateIssueStatus = (issueId, newStatus) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId ? { ...issue, status: newStatus } : issue
    ))
    showNotification(`Issue ${issueId} status updated to ${newStatus}`, 'success')
  }

  const assignEmployee = (issueId, employee) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId ? { ...issue, assignedTo: employee } : issue
    ))
    showNotification(`Issue ${issueId} assigned to ${employee}`, 'success')
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-success'
      case 'In Progress': return 'bg-warning'
      case 'Under Review': return 'bg-info'
      case 'Submitted': return 'bg-secondary'
      default: return 'bg-secondary'
    }
  }

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'High': return 'bg-danger'
      case 'Medium': return 'bg-warning'
      case 'Low': return 'bg-success'
      default: return 'bg-secondary'
    }
  }

  const stats = {
    total: issues.length,
    resolved: issues.filter(i => i.status === 'Resolved').length,
    inProgress: issues.filter(i => i.status === 'In Progress').length,
    pending: issues.filter(i => ['Submitted', 'Under Review'].includes(i.status)).length
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              <i className="bi bi-speedometer2 me-2"></i>
              Admin Dashboard
            </h2>
            <div className="text-muted">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="row mb-4">
            <div className="col-md-3 mb-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title text-primary">{stats.total}</h5>
                  <p className="card-text">Total Issues</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title text-success">{stats.resolved}</h5>
                  <p className="card-text">Resolved</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title text-warning">{stats.inProgress}</h5>
                  <p className="card-text">In Progress</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title text-info">{stats.pending}</h5>
                  <p className="card-text">Pending</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Filter by Status:</label>
                  <select
                    className="form-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Filter by Category:</label>
                  <select
                    className="form-select"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    {categoryOptions.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 mb-3 d-flex align-items-end">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => {
                      setFilterStatus('All')
                      setFilterCategory('All')
                    }}
                  >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Issues Table */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-list-ul me-2"></i>
                Issues Management ({filteredIssues.length} issues)
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Assigned To</th>
                      <th>Submitted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIssues.map(issue => (
                      <tr key={issue.id}>
                        <td>
                          <code>{issue.id}</code>
                        </td>
                        <td>
                          <span className="badge bg-primary">{issue.category}</span>
                        </td>
                        <td>
                          <div style={{ maxWidth: '200px' }}>
                            <div className="text-truncate" title={issue.description}>
                              {issue.description}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div style={{ maxWidth: '150px' }}>
                            <div className="text-truncate" title={issue.location}>
                              {issue.location}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(issue.status)}`}>
                            {issue.status}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${getPriorityBadgeClass(issue.priority)}`}>
                            {issue.priority}
                          </span>
                        </td>
                        <td>
                          <select
                            className="form-select form-select-sm"
                            value={issue.assignedTo}
                            onChange={(e) => assignEmployee(issue.id, e.target.value)}
                          >
                            <option value="Not Assigned">Not Assigned</option>
                            {employees.map(emp => (
                              <option key={emp} value={emp}>{emp}</option>
                            ))}
                          </select>
                        </td>
                        <td>{issue.submittedDate}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <select
                              className="form-select form-select-sm"
                              value={issue.status}
                              onChange={(e) => updateIssueStatus(issue.id, e.target.value)}
                            >
                              <option value="Submitted">Submitted</option>
                              <option value="Under Review">Under Review</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card mt-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-lightning me-2"></i>
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 mb-3">
                  <button className="btn btn-outline-primary w-100">
                    <i className="bi bi-download me-2"></i>
                    Export Data
                  </button>
                </div>
                <div className="col-md-3 mb-3">
                  <button className="btn btn-outline-success w-100">
                    <i className="bi bi-graph-up me-2"></i>
                    Generate Report
                  </button>
                </div>
                <div className="col-md-3 mb-3">
                  <button className="btn btn-outline-warning w-100">
                    <i className="bi bi-bell me-2"></i>
                    Send Notifications
                  </button>
                </div>
                <div className="col-md-3 mb-3">
                  <button className="btn btn-outline-info w-100">
                    <i className="bi bi-gear me-2"></i>
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

