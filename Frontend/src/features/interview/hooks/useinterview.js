import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
  generateResumePdf
} from "../services/interview.api";

import { useContext } from "react";
import { InterviewContext } from "../interview.context.jsx";

export const useInterview = () => {

  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error(
      "useInterview must be used within an InterviewProvider"
    );
  }

  const {
    loading,
    setLoading,
    report,
    interviewData,
    setInterviewData
  } = context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile
  }) => {

    setLoading(true);

    try {

      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile
      });

      console.log("API RESPONSE:", response);
      console.log(
        "REPORT DATA:",
        response.interviewReport
      );

      return response.interviewReport;

    } catch (error) {

      console.error(
        "Failed to generate interview report:",
        error
      );

      throw error;

    } finally {

      setLoading(false);

    }
  };

  const getReportById = async (interviewId) => {

    setLoading(true);

    try {

      const response =
        await getInterviewReportById(interviewId);

      console.log(
        "REPORT FETCHED:",
        response.interviewReport
      );

      setInterviewData(response.interviewReport);

    } catch (error) {

      console.error(
        "Failed to fetch interview report:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  const getReports = async () => {

    setLoading(true);

    try {

      const response =
        await getAllInterviewReports();

      setInterviewData(
        response.interviewReports
      );

    } catch (error) {

      console.error(
        "Failed to fetch interview reports:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  const getResumePdf = async (interviewReportId) => {

    setLoading(true);

    try {

      const response =
        await generateResumePdf(interviewReportId);

      return response;

    } catch (err) {

      console.error(
        "Failed to generate resume PDF:",
        err
      );

      throw err;

    } finally {

      setLoading(false);

    }
  };

  return {
    loading,
    report,
    interviewData,
    generateReport,
    getReportById,
    getReports,
    getResumePdf
  };
};