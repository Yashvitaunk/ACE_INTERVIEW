import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../../style/interview.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/Hooks/useAuth";

const Interview = () => {
  const [activeSection, setActiveSection] = useState("technical");
  const [expandedQuestions, setExpandedQuestions] = useState({});

  const toggleQuestion = (index) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  const handleResumeDownload = async () => {
  try {
    await getResumePdf(interviewId);
  } catch (err) {
    console.error("Failed to download resume:", err);
  }
};

  const {
  interviewData,
  loading,
  getReportById,
  getResumePdf
} = useInterview();

  const { interviewId } = useParams();

  const navigate = useNavigate();

const { handleLogout } = useAuth();

const logoutUser = async () => {
  await handleLogout();
  navigate("/login");
};

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!interviewData) {
    return <h2>No Report Found</h2>;
  }

  const currentQuestions =
    activeSection === "technical"
      ? (interviewData.technicalQuestions || [])
      : (interviewData.behavioralQuestions || []);

  return (
    <div className="interview-container">

      {/* LEFT SIDEBAR */}
      <aside className="left-sidebar">
        <div className="sidebar-title">SECTIONS</div>

        <button
          className={`sidebar-btn ${
            activeSection === "technical" ? "active" : ""
          }`}
          onClick={() => setActiveSection("technical")}
        >
          Technical Questions
        </button>

        <button
          className={`sidebar-btn ${
            activeSection === "behavioral" ? "active" : ""
          }`}
          onClick={() => setActiveSection("behavioral")}
        >
          Behavioral Questions
        </button>

        <button
          className={`sidebar-btn ${
            activeSection === "roadMap" ? "active" : ""
          }`}
          onClick={() => setActiveSection("roadMap")}
        >
          Road Map
        </button>
        <div className="resume-download-wrapper">
  <button
    className="resume-download-btn"
    onClick={handleResumeDownload}
  >
    <i className="ri-bard-fill"></i>
    <span>Download Resume</span>
  </button>
</div>
      </aside>

      {/* CENTER CONTENT */}
      <main className="main-content">
        {activeSection === "roadMap" ? (
          <div className="roadmap-content">

            <div className="roadmap-header">
              <h2>Preparation Road Map</h2>
              <span className="roadmap-duration">
                {(interviewData.preparationPlan || []).length}-day plan
              </span>
            </div>

            <div className="roadmap-timeline">
              {(interviewData.preparationPlan || []).map(
                (dayPlan, index) => (
                  <div key={index} className="timeline-item">

                    <div className="timeline-marker"></div>

                    <div className="timeline-content">
                      <h3>
                        <span className="day-label">
                          Day {dayPlan.day}
                        </span>

                        <span className="day-title">
                          {dayPlan.focus}
                        </span>
                      </h3>

                      <ul className="day-tasks">
                        {(dayPlan.tasks || []).map(
                          (task, taskIndex) => (
                            <li key={taskIndex}>{task}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="questions-content">

            <div className="questions-header">
              <h2>
                {activeSection === "technical"
                  ? "Technical Questions"
                  : "Behavioral Questions"}
              </h2>

              <span className="questions-count">
                {currentQuestions.length} questions
              </span>
            </div>

            <div className="questions-accordion">
              {currentQuestions.map((question, index) => {

                const key = `${activeSection}-${index}`;

                return (
                  <div
                    key={index}
                    className={`accordion-item ${
                      expandedQuestions[key]
                        ? "expanded"
                        : ""
                    }`}
                  >
                    <button
                      className="accordion-header"
                      onClick={() => toggleQuestion(key)}
                    >
                      <div className="question-number">
                        Q{String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="question-text-wrapper">
                        <p className="accordion-question">
                          {question.question}
                        </p>
                      </div>

                      <div className="accordion-toggle">
                        {expandedQuestions[key]
                          ? "▲"
                          : "▼"}
                      </div>
                    </button>

                    {expandedQuestions[key] && (
                      <div className="accordion-content">

                        <div className="intention-section">
                          <p className="section-label">
                            INTENTION
                          </p>

                          <p className="section-text">
                            {question.intention}
                          </p>
                        </div>

                        <div className="answer-section">
                          <p className="section-label">
                            MODEL ANSWER
                          </p>

                          <p className="section-text">
                            {question.answer}
                          </p>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        )}
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="right-sidebar">

        <div className="match-score-section">
          <h4>MATCH SCORE</h4>

          <div className="score-circle">
            <div className="score-value">
              <span>{interviewData.matchScore}</span>
              <span className="score-percent">%</span>
            </div>
          </div>

          <p className="score-text">
            Strong match for this role
          </p>
        </div>

        <div className="skill-gap-section">
          <h4>SKILL GAPS</h4>

          <div className="skills-list">
            {(interviewData.skillGaps || []).map(
              (skill, index) => (
                <span
                  key={index}
                  className={`skill-badge ${skill.severity}`}
                >
                  {skill.skill}
                </span>
              )
            )}
          </div>
          
        </div>
        <div className="logout-wrapper">
  <button
    className="logout-btn"
    onClick={async () => {
      await handleLogout();
      navigate("/login");
    }}
  >
    Logout
  </button>
</div>

      </aside>

    </div>
  );
};

export default Interview;