import React, { useState } from 'react'

const TrackIssue = ({ showNotification }) => {
  const [searchType, setSearchType] = useState('id')
  const [searchValue, setSearchValue] = useState('')
  const [issueData, setIssueData] = useState(null)
  const [isSearching, setIsSearching] = useState(false)

  // Mock issue data for demonstration
  const mockIssues = {
    'FF12345678': {
      id: 'FF12345678',
      category: 'Road Damage',
      description: 'Large pothole on Main Street near the intersection',
      location: 'Main Street, Downtown',
      status: 'In Progress',
      priority: 'High',
      submittedDate: '2024-01-15',
      assignedTo: 'John Smith',
      estimatedResolution: '2024-01-20',
      updates: [
        {
          date: '2024-01-15',
          status: 'Submitted',
          message: 'Issue reported and received'
        },
        {
          date: '2024-01-16',
          status: 'Under Review',
          message: 'Issue assigned to road maintenance team'
        },
        {
          date: '2024-01-17',
          status: 'In Progress',
          message: 'Work crew dispatched to assess and repair'
        }
      ]
    },
    'FF87654321': {
      id: 'FF87654321',
      category: 'Garbage',
      description: 'Overflowing trash bins in the park',
      location: 'Central Park',
      status: 'Resolved',
      priority: 'Medium',
      submittedDate: '2024-01-10',
      assignedTo: 'Sarah Johnson',
      estimatedResolution: '2024-01-12',
      updates: [
        {
          date: '2024-01-10',
          status: 'Submitted',
          message: 'Issue reported and received'
        },
        {
          date: '2024-01-11',
          status: 'In Progress',
          message: 'Garbage collection scheduled'
        },
        {
          date: '2024-01-12',
          status: 'Resolved',
          message: 'Trash bins emptied and area cleaned'
        }
      ]
    }
  }

  const statusSteps = ['Submitted', 'Under Review', 'In Progress', 'Resolved']

  const handleSearch = async (e) => {
    e.preventDefault()
    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      const foundIssue = mockIssues[searchValue.toUpperCase()]
      
      if (foundIssue) {
        setIssueData(foundIssue)
        showNotification('Issue found successfully!', 'success')
      } else {
        setIssueData(null)
        showNotification('No issue found with the provided ID or email.', 'error')
      }
      
      setIsSearching(false)
    }, 1500)
  }

  const getStatusIndex = (status) => {
    return statusSteps.indexOf(status)
  }

  const getStatusClass = (currentStatus, stepStatus) => {
    const currentIndex = getStatusIndex(currentStatus)
    const stepIndex = getStatusIndex(stepStatus)
    
    if (stepIndex < currentIndex) return 'completed'
    if (stepIndex === currentIndex) return 'active'
    return ''
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header text-center">
              <h2 className="mb-0">
                <i className="bi bi-search me-2"></i>
                Track Your Issue
              </h2>
              <p className="mb-0 mt-2">Monitor the progress of your reported issues</p>
            </div>
            
            <div className="card-body">
              {/* Search Form */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Search by:</label>
                    <select
                      className="form-select"
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                    >
                      <option value="id">Issue ID</option>
                      <option value="email">Email Address</option>
                    </select>
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      {searchType === 'id' ? 'Issue ID' : 'Email Address'}:
                    </label>
                    <input
                      type={searchType === 'email' ? 'email' : 'text'}
                      className="form-control"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder={searchType === 'id' ? 'Enter your Issue ID (e.g., FF12345678)' : 'Enter your email address'}
                      required
                    />
                  </div>
                  
                  <div className="col-md-2 mb-3 d-flex align-items-end">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={isSearching}
                    >
                      {isSearching ? (
                        <span className="spinner-border spinner-border-sm" role="status"></span>
                      ) : (
                        <>
                          <i className="bi bi-search me-1"></i>
                          Search
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Demo IDs */}
              <div className="alert alert-info">
                <h6><i className="bi bi-info-circle me-2"></i>Demo Issue IDs:</h6>
                <p className="mb-1">Try these sample IDs to see the tracking system:</p>
                <ul className="mb-0">
                  <li><strong>FF12345678</strong> - Road Damage (In Progress)</li>
                  <li><strong>FF87654321</strong> - Garbage (Resolved)</li>
                </ul>
              </div>

              {/* Issue Details */}
              {issueData && (
                <div className="mt-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">
                        <i className="bi bi-file-text me-2"></i>
                        Issue Details
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <p><strong>Issue ID:</strong> {issueData.id}</p>
                          <p><strong>Category:</strong> {issueData.category}</p>
                          <p><strong>Status:</strong> 
                            <span className={`badge ms-2 ${
                              issueData.status === 'Resolved' ? 'bg-success' :
                              issueData.status === 'In Progress' ? 'bg-warning' :
                              'bg-primary'
                            }`}>
                              {issueData.status}
                            </span>
                          </p>
                          <p><strong>Priority:</strong> 
                            <span className={`badge ms-2 ${
                              issueData.priority === 'High' ? 'bg-danger' :
                              issueData.priority === 'Medium' ? 'bg-warning' :
                              'bg-success'
                            }`}>
                              {issueData.priority}
                            </span>
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p><strong>Location:</strong> {issueData.location}</p>
                          <p><strong>Submitted:</strong> {issueData.submittedDate}</p>
                          <p><strong>Assigned To:</strong> {issueData.assignedTo}</p>
                          <p><strong>Est. Resolution:</strong> {issueData.estimatedResolution}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p><strong>Description:</strong></p>
                        <p className="text-muted">{issueData.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status Tracker */}
                  <div className="card mt-4">
                    <div className="card-header">
                      <h5 className="mb-0">
                        <i className="bi bi-activity me-2"></i>
                        Progress Tracker
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="status-tracker">
                        {statusSteps.map((step, index) => (
                          <div 
                            key={step} 
                            className={`status-step ${getStatusClass(issueData.status, step)}`}
                          >
                            <div className="status-circle">
                              {getStatusClass(issueData.status, step) === 'completed' ? (
                                <i className="bi bi-check"></i>
                              ) : (
                                index + 1
                              )}
                            </div>
                            <div className="fw-bold">{step}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Updates Timeline */}
                  <div className="card mt-4">
                    <div className="card-header">
                      <h5 className="mb-0">
                        <i className="bi bi-clock-history me-2"></i>
                        Updates Timeline
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="timeline">
                        {issueData.updates.map((update, index) => (
                          <div key={index} className="timeline-item d-flex mb-3">
                            <div className="timeline-marker me-3">
                              <div className={`status-circle ${
                                getStatusClass(issueData.status, update.status)
                              }`}>
                                {getStatusClass(issueData.status, update.status) === 'completed' ? (
                                  <i className="bi bi-check"></i>
                                ) : (
                                  index + 1
                                )}
                              </div>
                            </div>
                            <div className="timeline-content">
                              <div className="d-flex justify-content-between align-items-start">
                                <h6 className="mb-1">{update.status}</h6>
                                <small className="text-muted">{update.date}</small>
                              </div>
                              <p className="mb-0 text-muted">{update.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackIssue

