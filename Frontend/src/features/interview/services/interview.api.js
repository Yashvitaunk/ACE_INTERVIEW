import axios from "axios";
import { saveAs } from "file-saver";

const api = axios.create({
 baseURL: "https://aceinterview-backend.onrender.com",
  withCredentials: true,
});

export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  const formData = new FormData();

  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);

  if (resumeFile) {
    formData.append("resume", resumeFile);
  }

  const response = await api.post(
    "/api/interview/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

/**
 * @description Get an interview report by its ID
 * @param {string} interviewId
 * @returns {Promise}
 */
export const getInterviewReportById = async (interviewId) => {
  const response = await api.get(
    `/api/interview/report/${interviewId}`
  );

  return response.data;
};

export const getAllInterviewReports = async () => {
  const response = await api.get("/api/interview/");

  return response.data;
};
/* @description Generate resume PDF based on user selfDescription, job description and resume content. It uses the generateResumePdf function from ai.service which in turn uses puppeteer to generate PDF buffer from HTML content returned by Gemini AI. */

export const generateResumePdf = async (interviewReportId) => {
  const response = await api.get(
    `/api/interview/resume/pdf/${interviewReportId}`,
    {
      responseType: "blob",
    }
  );

  const url = window.URL.createObjectURL(
    new Blob([response.data])
  );

  const link = document.createElement("a");

  link.href = url;
  link.download = `resume-${interviewReportId}.pdf`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);

  return response.data;
};