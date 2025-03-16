import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const Analysis = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Retrieve analysis data from localStorage
    const storedData = localStorage.getItem(`analysis_${id}`);
    
    if (storedData) {
      setAnalysisData(JSON.parse(storedData));
      setLoading(false);
    } else {
      setError('Analysis data not found');
      setLoading(false);
    }
  }, [id]);

  const handleDownloadReport = () => {
    const reportElement = document.getElementById('analysis-report');
    
    if (!reportElement) {
      alert('Report content not found');
      return;
    }
    
    const opt = {
      margin: 10,
      filename: `founder_analysis_${analysisData.name.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(reportElement).save();
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--green)';
    if (score >= 60) return 'var(--yellow)';
    return 'var(--red)';
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading analysis results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="analysis-page">
      <div className="container">
        <div className="analysis-header">
          <h1>Founder Potential Analysis</h1>
          <button 
            className="btn btn-primary download-btn"
            onClick={handleDownloadReport}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
            Download Report
          </button>
        </div>

        <div className="analysis-content" id="analysis-report">
          <div className="card">
            <div className="profile-header">
              <div className="profile-image">
                <img src={analysisData.profileImage} alt={analysisData.name} />
              </div>
              <div className="profile-info">
                <h2>{analysisData.name}</h2>
                <div className="score-container">
                  <div 
                    className="score-circle" 
                    style={{ 
                      background: `conic-gradient(
                        ${getScoreColor(analysisData.overallScore)} ${analysisData.overallScore * 3.6}deg, 
                        #f0f0f0 ${analysisData.overallScore * 3.6}deg 360deg
                      )` 
                    }}
                  >
                    <div className="score-value">{analysisData.overallScore}</div>
                  </div>
                  <div className="score-label">
                    <h3>Founder Potential</h3>
                    <p className="recommendation">{analysisData.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="report-section">
              <h3>Executive Summary</h3>
              <p>{analysisData.summary}</p>
            </div>

            <div className="report-section">
              <h3>Key Strengths</h3>
              <ul className="strengths-list">
                {analysisData.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>

            <div className="report-section">
              <h3>Areas for Improvement</h3>
              <ul className="weaknesses-list">
                {analysisData.weaknesses.map((weakness, index) => (
                  <li key={index}>{weakness}</li>
                ))}
              </ul>
            </div>

            <div className="report-section">
              <h3>Recommendations</h3>
              <ul className="recommendations-list">
                {analysisData.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card analysis-metrics">
            <h3>Detailed Metrics</h3>
            
            <div className="metrics-grid">
              {analysisData.metrics.map((metric, index) => (
                <div key={index} className="metric-item">
                  <div className="metric-header">
                    <h4>{metric.name}</h4>
                    <div 
                      className="metric-score" 
                      style={{ backgroundColor: getScoreColor(metric.score) }}
                    >
                      {metric.score}
                    </div>
                  </div>
                  <p className="metric-description">{metric.description}</p>
                  <div className="metric-bar-container">
                    <div 
                      className="metric-bar" 
                      style={{ 
                        width: `${metric.score}%`,
                        backgroundColor: getScoreColor(metric.score)
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis; 