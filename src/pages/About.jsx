import React from 'react'

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="hero-title">About FixForce</h1>
              <p className="hero-subtitle">
                Revolutionizing Civic Engagement Through Technology
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-5 fw-bold text-primary mb-4">Our Mission</h2>
              <p className="lead">
                FixForce is dedicated to bridging the gap between citizens and government 
                through innovative technology solutions. We believe that every citizen 
                should have a voice in improving their community, and every issue should 
                be addressed with transparency and efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Features */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="display-5 fw-bold text-primary">What Makes Us Unique</h2>
              <p className="lead">Cutting-edge features that set us apart</p>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <div className="mb-3">
                    <i className="bi bi-robot text-primary" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="card-title">AI Classification</h5>
                  <p className="card-text">
                    Our advanced AI automatically categorizes and prioritizes issues 
                    based on severity, location, and type, ensuring faster response times.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <div className="mb-3">
                    <i className="bi bi-mic-fill text-primary" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="card-title">Voice-to-Text</h5>
                  <p className="card-text">
                    Report issues using voice commands. Our speech recognition technology 
                    converts your spoken words into detailed issue reports.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <div className="mb-3">
                    <i className="bi bi-star-fill text-primary" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="card-title">Citizen Ratings</h5>
                  <p className="card-text">
                    Rate the quality of issue resolution and provide feedback to help 
                    improve government services and accountability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="display-5 fw-bold text-primary">Our Impact</h2>
              <p className="lead">Transforming communities through technology</p>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="text-center">
                <div className="mb-3">
                  <i className="bi bi-speedometer2 text-success" style={{ fontSize: '3rem' }}></i>
                </div>
                <h4 className="text-success">Faster Resolutions</h4>
                <p>
                  Issues are resolved 60% faster compared to traditional reporting methods. 
                  Our streamlined process ensures quick response and efficient resolution.
                </p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="text-center">
                <div className="mb-3">
                  <i className="bi bi-eye text-info" style={{ fontSize: '3rem' }}></i>
                </div>
                <h4 className="text-info">Transparency</h4>
                <p>
                  Complete visibility into the issue resolution process. Citizens can track 
                  progress in real-time and see exactly what's being done to address their concerns.
                </p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="text-center">
                <div className="mb-3">
                  <i className="bi bi-people-fill text-warning" style={{ fontSize: '3rem' }}></i>
                </div>
                <h4 className="text-warning">Community Engagement</h4>
                <p>
                  Increased citizen participation in local governance. More people are 
                  actively involved in improving their communities through our platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="display-5 fw-bold text-primary">Technology Stack</h2>
              <p className="lead">Built with modern, reliable technologies</p>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-3 col-sm-6">
              <div className="text-center">
                <div className="mb-3">
                  <i className="bi bi-code-slash text-primary" style={{ fontSize: '2.5rem' }}></i>
                </div>
                <h6>React.js</h6>
                <p className="text-muted small">Modern frontend framework</p>
              </div>
            </div>
            
            <div className="col-md-3 col-sm-6">
              <div className="text-center">
                <div className="mb-3">
                  <i className="bi bi-bootstrap text-primary" style={{ fontSize: '2.5rem' }}></i>
                </div>
                <h6>Bootstrap 5</h6>
                <p className="text-muted small">Responsive design framework</p>
              </div>
            </div>
            
            <div className="col-md-3 col-sm-6">
              <div className="text-center">
                <div className="mb-3">
                  <i className="bi bi-cloud text-primary" style={{ fontSize: '2.5rem' }}></i>
                </div>
                <h6>Cloud Infrastructure</h6>
                <p className="text-muted small">Scalable and secure hosting</p>
              </div>
            </div>
            
            <div className="col-md-3 col-sm-6">
              <div className="text-center">
                <div className="mb-3">
                  <i className="bi bi-shield-check text-primary" style={{ fontSize: '2.5rem' }}></i>
                </div>
                <h6>Security</h6>
                <p className="text-muted small">Enterprise-grade security</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="display-5 fw-bold text-primary">Our Team</h2>
              <p className="lead">Dedicated professionals working for better communities</p>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <div className="mb-3">
                    <i className="bi bi-person-circle text-primary" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <h5 className="card-title">Development Team</h5>
                  <p className="card-text">
                    Expert developers creating innovative solutions for civic engagement 
                    and government transparency.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <div className="mb-3">
                    <i className="bi bi-gear-fill text-primary" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <h5 className="card-title">Technical Support</h5>
                  <p className="card-text">
                    Dedicated support team ensuring smooth operation and helping users 
                    make the most of our platform.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <div className="mb-3">
                    <i className="bi bi-people-fill text-primary" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <h5 className="card-title">Community Managers</h5>
                  <p className="card-text">
                    Community engagement specialists working to build stronger connections 
                    between citizens and government.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h3 className="mb-4">Join the Movement</h3>
              <p className="lead mb-4">
                Be part of the solution. Together, we can build smarter, more responsive 
                cities that truly serve their citizens.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <a href="/report" className="btn btn-light btn-lg">
                  <i className="bi bi-plus-circle me-2"></i>
                  Report an Issue
                </a>
                <a href="/contact" className="btn btn-outline-light btn-lg">
                  <i className="bi bi-envelope me-2"></i>
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

