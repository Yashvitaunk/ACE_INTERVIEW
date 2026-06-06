import React, { useState, useRef, useEffect } from "react";
import "../style/home.scss"
import { useInterview } from '../hooks/useinterview.js'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const {
  loading,
  generateReport,
  interviewData,
  getReports
} = useInterview()

  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")

  const resumeInputRef = useRef(null)

  const navigate = useNavigate()

  useEffect(() => {
  getReports();
}, []);
console.log("INTERVIEW DATA:", interviewData);
  const handleGenerateReport = async () => {
    try {

      const resumeFile = resumeInputRef.current?.files?.[0]

      console.log("Resume File:", resumeFile)

      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile
      })

      console.log("Generated Report:", data)

      if (data?._id) {
        navigate(`/interview/${data._id}`)
      } else {
        console.error("Report ID not found:", data)
      }

    } catch (error) {
      console.error("Error generating report:", error)
    }
  }

  if (loading) {
    return (
      <main className='loading-screen'>
        <h1>Loading your interview plan...</h1>
      </main>
    )
  }

  return (
    <main className='home'>
      {/* Header Section */}
      <div className="header-section">
        <h1 className="header-title">
          Create Your Custom <span className="highlight-text">Interview Plan</span>
        </h1>
        <p className="header-subtitle">
          Let our AI analyze the job requirements and your unique profile to build a winning strategy.
        </p>
      </div>

      {/* Form Section */}
      <div className="form-container">

        {/* Left Column */}
        <div className="form-column left-column">
          <div className="column-header">
            <h2 className="column-title">Target Job Description</h2>
            <span className="required-badge">REQUIRED</span>
          </div>

          <textarea
            onChange={(e) => setJobDescription(e.target.value)}
            name="jobDescription"
            id="jobDescription"
            className="textarea-input"
            placeholder="Paste the full job description here..."
          ></textarea>

          <div className="char-count">0 / 5000 chars</div>
        </div>

        {/* Right Column */}
        <div className="form-column right-column">

          <div className="column-header">
            <svg className="profile-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <h2 className="column-title">Your Profile</h2>
          </div>

          {/* Resume Upload */}
          <div className="upload-section">
            <label className="upload-label">
              Upload Resume <span className="required-indicator">BEST RESULT</span>
            </label>

            <div className="upload-area">
              <input
                ref={resumeInputRef}
                type="file"
                id="resume"
                name="resume"
                className="file-input"
                accept=".pdf,.doc,.docx"
              />

              <div className="upload-placeholder">
                <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>

                <p className="upload-text">
                  Click to upload or drag & drop
                </p>

                <p className="upload-subtext">
                  PDF or DOCX (Max 5MB)
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="divider-section">
            <div className="divider"></div>
            <span className="divider-text">OR</span>
            <div className="divider"></div>
          </div>

          {/* Self Description */}
          <div className="description-section">
            <label htmlFor="selfDescription" className="section-label">
              Quick Self-Description
            </label>

            <textarea
              onChange={(e) => setSelfDescription(e.target.value)}
              id="selfDescription"
              name="selfDescription"
              className="textarea-input small"
              placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
            ></textarea>
          </div>

          {/* Info Box */}
          <div className="info-box">
            <svg className="info-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>

            <span className="info-text">
              Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.
            </span>
          </div>

        </div>
      </div>
     
     {/* Recent reports list */}
{Array.isArray(interviewData) &&
  interviewData.length > 0 && (
    <div className="recent-reports">
      <h2>My Recent Interview Plans</h2>

      <div className="reports-grid">
       {interviewData
  .sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  )
  .slice(0, 3)
  .map((report) => (
          <div
            key={report._id}
            className="report-card"
            onClick={() =>
              navigate(`/interview/${report._id}`)
            }
          >
            <h3>
  {report.jobRole ||
    report.jobTitle ||
    report.targetRole ||
    report.position ||
    "Interview Report"}
</h3>

            <p>
              Generated on{" "}
              {report.createdAt
                ? new Date(
                    report.createdAt
                  ).toLocaleDateString()
                : "N/A"}
            </p>

            <span>
              Match Score:{" "}
              {report.matchScore ?? 0}%
            </span>
          </div>
        ))}
      </div>
    </div>
)}
      {/* Footer */}

      <div className="footer-section">
        <p className="ai-note">
          AI-Powered Strategy Generation • Approx 30s
        </p>

        <button
          onClick={handleGenerateReport}
          className="generate-btn"
          disabled={loading}
        >
          <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z" />
          </svg>

          {loading ? "Generating..." : "Generate My Interview Strategy"}
        </button>
      </div>
    </main>
  )


}

export default Home