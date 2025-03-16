import React from 'react';
import UploadForm from '../components/UploadForm';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Identify Successful Founders Before They Launch</h1>
            <p>
              Upload a LinkedIn profile PDF to analyze founder potential using our
              proprietary algorithm developed from studying successful venture-backed
              entrepreneurs.
            </p>
          </div>
        </div>
      </section>

      <section className="upload-section">
        <div className="container">
          <div className="section-header">
            <h2>Analyze Founder Potential</h2>
            <p>Upload a LinkedIn profile PDF to get started</p>
          </div>
          <UploadForm />
          <div className="upload-instructions">
            <h3>How to use:</h3>
            <ol>
              <li>Save a LinkedIn profile as PDF (from browser: Print → Save as PDF)</li>
              <li>Upload the PDF using the form above</li>
              <li>Our algorithm will analyze the profile for founder potential</li>
              <li>Review the detailed analysis and download the report</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why FounderScan?</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Data-Driven Insights</h3>
              <p>
                Our algorithm is trained on profiles of successful founders backed by
                top VCs like Antler, EF, and Kalari.
              </p>
            </div>
            <div className="feature-card">
              <h3>Comprehensive Analysis</h3>
              <p>
                We evaluate experience, education, skills, and career trajectory to
                identify founder potential.
              </p>
            </div>
            <div className="feature-card">
              <h3>Save Time</h3>
              <p>
                Quickly screen potential founders before investing your valuable time
                in meetings.
              </p>
            </div>
            <div className="feature-card">
              <h3>Detailed Reports</h3>
              <p>
                Get downloadable reports with actionable insights and founder potential
                scores.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 