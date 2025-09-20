import React, { useState } from 'react'

const Contact = ({ showNotification }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      showNotification('Thank you for your message! We\'ll get back to you soon.', 'success')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    }, 2000)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="hero-title">Contact Us</h1>
              <p className="hero-subtitle">
                Get in touch with our team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            {/* Contact Form */}
            <div className="col-lg-8 mb-5">
              <div className="card">
                <div className="card-header">
                  <h3 className="mb-0">
                    <i className="bi bi-envelope me-2"></i>
                    Send us a Message
                  </h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
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
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="subject" className="form-label">Subject *</label>
                      <select
                        className="form-select"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                        <option value="bug">Bug Report</option>
                        <option value="feature">Feature Request</option>
                      </select>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">Message *</label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please describe your inquiry in detail..."
                        required
                      ></textarea>
                    </div>
                    
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg px-5"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send me-2"></i>
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="bi bi-info-circle me-2"></i>
                    Contact Information
                  </h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <h6><i className="bi bi-geo-alt text-primary me-2"></i>Address</h6>
                    <p className="text-muted mb-0">
                      123 Civic Center Drive<br />
                      Suite 100<br />
                      City, State 12345
                    </p>
                  </div>
                  
                  <div className="mb-3">
                    <h6><i className="bi bi-telephone text-primary me-2"></i>Phone</h6>
                    <p className="text-muted mb-0">+1 (555) 123-4567</p>
                  </div>
                  
                  <div className="mb-3">
                    <h6><i className="bi bi-envelope text-primary me-2"></i>Email</h6>
                    <p className="text-muted mb-0">info@fixforce.com</p>
                  </div>
                  
                  <div className="mb-3">
                    <h6><i className="bi bi-clock text-primary me-2"></i>Business Hours</h6>
                    <p className="text-muted mb-0">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="bi bi-share me-2"></i>
                    Follow Us
                  </h5>
                </div>
                <div className="card-body text-center">
                  <div className="social-icons">
                    <a href="#" className="me-3" title="LinkedIn">
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a href="#" className="me-3" title="Twitter">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" className="me-3" title="Facebook">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" className="me-3" title="Instagram">
                      <i className="bi bi-instagram"></i>
                    </a>
                  </div>
                  <p className="text-muted mt-3 mb-0">
                    Stay updated with the latest news and updates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="display-5 fw-bold text-primary">Frequently Asked Questions</h2>
              <p className="lead">Quick answers to common questions</p>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faq1">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                      How quickly are issues typically resolved?
                    </button>
                  </h2>
                  <div id="collapse1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Most issues are acknowledged within 24 hours and resolved within 3-7 business days, 
                      depending on the complexity and type of issue. High-priority issues like safety 
                      concerns are addressed immediately.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faq2">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
                      Can I report issues anonymously?
                    </button>
                  </h2>
                  <div id="collapse2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Yes, you can choose to report issues anonymously. However, providing contact 
                      information allows us to send you updates about the progress and resolution 
                      of your issue.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faq3">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
                      What types of issues can I report?
                    </button>
                  </h2>
                  <div id="collapse3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      You can report various civic issues including road damage, garbage problems, 
                      water leaks, streetlight issues, and other infrastructure problems. 
                      Emergency situations should still be reported to 911.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faq4">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4">
                      How do I track the progress of my reported issue?
                    </button>
                  </h2>
                  <div id="collapse4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      After submitting an issue, you'll receive a unique Issue ID. You can use 
                      this ID on our Track Issue page to monitor the progress in real-time. 
                      You'll also receive email notifications for status updates.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

