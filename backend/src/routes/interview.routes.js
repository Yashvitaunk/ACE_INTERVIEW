const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");
console.log("authMiddleware =", authMiddleware);
console.log("upload =", upload);
console.log("interviewController =", interviewController);

const interviewRouter = express.Router();

/**
 * @route POST /api/interview
 * @description Generate interview report
 * @access Private
 */
interviewRouter.post(
  "/",
  authMiddleware.authUser,
  upload.single("resume"),
  interviewController.generateInterViewReportController
);

/**
 * @route GET /api/interview/report/:interviewId
 * @description Get interview report by ID
 * @access Private
 */
interviewRouter.get(
  "/report/:interviewId",
  authMiddleware.authUser,
  interviewController.getInterviewReportByIdController
);

/**
 * @route GET /api/interview
 * @description Get all interview reports
 * @access Private
 */
interviewRouter.get(
  "/",
  authMiddleware.authUser,
  interviewController.getAllInterviewReportsController
);

/*
  * @route GET /api/interview/:interviewId/resume*/
// interviewRouter.get(
//   "/:interviewId/resume",
//   authMiddleware.authUser,
//   interviewController.generateResumePdfController
// );


/**
 * @route GET /api/interview/:interviewId/resume
 * @description Generate resume PDF based on user selfDescription, job description and resume content. It uses the generateResumePdf function from ai.service which in turn uses puppeteer to generate PDF buffer from HTML content returned by Gemini AI.
 * @access Private
 */
interviewRouter.get("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController) ;

module.exports = interviewRouter;