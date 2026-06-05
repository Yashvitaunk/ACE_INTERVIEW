const pdfParse = require("pdf-parse");
const { generateInterviewReport, generateResumePdf} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterViewReportController(req, res) {
  try {

    console.log("===== REQUEST RECEIVED =====");

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a resume PDF"
      });
    }

    console.log("FILE:", req.file.originalname);

    const resumeContent = await pdfParse(req.file.buffer);

    const { selfDescription, jobDescription } = req.body;

    console.log("JD Length:", jobDescription?.length || 0);
    console.log("Resume Length:", resumeContent.text?.length || 0);

    const interviewReportByAi = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
    });

    console.log("===== AI DATA =====");
    console.log(interviewReportByAi);

    const title =
      jobDescription?.split("\n")[0]?.trim() ||
      "Interview Report";

    const interviewReport = await interviewReportModel.create({
      title,
      user: req.user?.id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...interviewReportByAi,
    });

    console.log("===== SAVED REPORT =====");
    console.log(interviewReport._id);

    return res.status(201).json({
      message: "Interview report generated successfully",
      interviewReport,
    });

  } catch (error) {

    console.error("===== CONTROLLER ERROR =====");
    console.error(error);

    return res.status(500).json({
      message: "Failed to generate interview report",
      error: error.message,
    });
  }
}

async function getInterviewReportByIdController(req, res) {
  try {

    const { interviewId } = req.params;

    const interviewReport =
      await interviewReportModel.findById(interviewId);

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found",
      });
    }

    return res.status(200).json({
      message: "Interview report fetched successfully",
      interviewReport,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch interview report",
      error: error.message,
    });
  }
}

async function getAllInterviewReportsController(req, res) {
  try {

    const interviewReports =
      await interviewReportModel
        .find({ user: req.user.id })
        .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Interview reports fetched successfully",
      interviewReports,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch interview reports",
      error: error.message,
    });
  }
}
/**
 * @description Controller generate resume PDF based on user selfDescription, job description and resume content. It uses the generateResumePdf function from ai.service which in turn uses puppeteer to generate PDF buffer from HTML content returned by Gemini AI.

 */
async function generateResumePdfController(req, res) {
  try {

    const { interviewReportId } = req.params;

    const interviewReport =
      await interviewReportModel.findById(interviewReportId);

      console.log("===== PDF DATA =====");
console.log({
  resume: interviewReport.resume?.slice(0, 100),
  selfDescription: interviewReport.selfDescription,
  jobDescription: interviewReport.jobDescription?.slice(0, 100)
});

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found"
      });
    }

    const pdfBuffer = await generateResumePdf({
      resume: interviewReport.resume,
      selfDescription: interviewReport.selfDescription,
      jobDescription: interviewReport.jobDescription
    });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition":
        `attachment; filename=tailored_resume_${interviewReportId}.pdf`
    });

    return res.send(pdfBuffer);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Failed to generate PDF",
      error: error.message
    });
  }
}
module.exports = {
  generateInterViewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController
};