import React, { useState } from 'react'

const ReportIssue = ({ showNotification }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    location: '',
    description: '',
    photo: null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    'Garbage',
    'Road Damage',
    'Water Leakage',
    'Streetlight',
    'Others'
  ]

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      // Generate a mock issue ID
      const issueId = 'FF' + Math.random().toString(36).substr(2, 8).toUpperCase()
      
      setIsSubmitting(false)
      showNotification(
        `Issue submitted successfully! Your Issue ID is: ${issueId}. You can track it using this ID.`,
        'success'
      )
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '',
        location: '',
        description: '',
        photo: null
      })
    }, 2000)
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setFormData(prev => ({
            ...prev,
            location: `${latitude}, ${longitude}`
          }))
          showNotification('Location captured successfully!', 'success')
        },
        (error) => {
          showNotification('Unable to get location. Please enter manually.', 'error')
        }
      )
    } else {
      showNotification('Geolocation is not supported by this browser.', 'error')
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header text-center">
              <h2 className="mb-0">
                <i className="bi bi-plus-circle me-2"></i>
                Report a Civic Issue
              </h2>
              <p className="mb-0 mt-2">Help us make your city better</p>
            </div>
            
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <div className="row mb-4">
                  <div className="col-12">
                    <h5 className="text-primary mb-3">
                      <i className="bi bi-person me-2"></i>
                      Personal Information
                    </h5>
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Issue Details */}
                <div className="row mb-4">
                  <div className="col-12">
                    <h5 className="text-primary mb-3">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      Issue Details
                    </h5>
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="category" className="form-label">Issue Category *</label>
                    <select
                      className="form-select"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="location" className="form-label">Location *</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Enter address or coordinates"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={getCurrentLocation}
                      >
                        <i className="bi bi-geo-alt"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-12 mb-3">
                    <label htmlFor="description" className="form-label">Description *</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="4"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Please provide a detailed description of the issue..."
                      required
                    ></textarea>
                  </div>
                  
                  <div className="col-12 mb-3">
                    <label htmlFor="photo" className="form-label">Upload Photo (Optional)</label>
                    <input
                      type="file"
                      className="form-control"
                      id="photo"
                      name="photo"
                      accept="image/*"
                      onChange={handleInputChange}
                    />
                    <div className="form-text">
                      Upload a clear photo of the issue to help us understand it better.
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg px-5"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send me-2"></i>
                        Submit Issue
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="card mt-4">
            <div className="card-body">
              <h6 className="text-primary mb-3">
                <i className="bi bi-info-circle me-2"></i>
                What happens next?
              </h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Your issue will be automatically classified and prioritized
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  You'll receive a unique Issue ID for tracking
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  The appropriate department will be notified
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  You can track progress using your Issue ID
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportIssue

