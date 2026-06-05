const { GoogleGenAI } = require("@google/genai");
const puppeteer = require("puppeteer");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
});

async function invokeGeminiAi() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Hello Gemini! Explain what is an interview."
    });

    console.log(response.text);

  } catch (error) {
    console.error(error);
  }
}

async function generateInterviewReport({
  jobDescription,
  resume,
  selfDescription
}) {

  console.log("===== GEMINI REQUEST START =====");
  console.log("Resume Length:", resume?.length || 0);
  console.log("Job Description Length:", jobDescription?.length || 0);

  const prompt = `
You are an expert interview preparation assistant.

Return ONLY valid JSON.

Do not return markdown.
Do not return explanation.
Do not return any text outside JSON.

Return exactly in this structure:

{
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "behavioralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "skillGaps": [
    {
      "skill": string,
      "severity": "low" | "medium" | "high"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": string,
      "tasks": [string]
    }
  ]
}

Requirements:

- Match score out of 100

- Generate exactly 4 technical questions
- Generate exactly 2 behavioral questions
- Generate exactly 4 skill gaps

- Generate exactly 7 preparation days
IMPORTANT:
- Keep all answers short
- Maximum 80 words per answer
- Maximum 15 words for intention
- Return compact JSON only
- Do not generate long paragraphs

Technical Questions:
- Question maximum 30 words
- Intention maximum 15 words
- Answer maximum 60 words
- No bullet points
- No numbering
- No markdown

Behavioral Questions:
- Question maximum 30 words
- Intention maximum 15 words
- Answer maximum 60 words
- No bullet points
- No numbering
- No markdown

Skill Gaps:
- Keep skill names short
- Maximum 4 words

Preparation Plan:
- Only Day 1 to Day 7
- Maximum 3 tasks per day
- Each task maximum 10 words

Questions should be based on BOTH resume and job description.

Resume:
${resume?.slice(0, 3000)}

Self Description:
${selfDescription}

Job Description:
${jobDescription?.slice(0, 3000)}
`;

  try {

    let response;

    for (let i = 0; i < 3; i++) {

      try {

        response = await ai.models.generateContent({
          model: "gemini-2.5-flash",

          contents: prompt,

          config: {
  responseMimeType: "application/json",
  temperature: 0.3,
  maxOutputTokens: 8192
}
        });

        break;

      } catch (err) {

        if (err.status === 503 && i < 2) {

          console.log(`Retry ${i + 1} after 503...`);

          await new Promise(resolve =>
            setTimeout(resolve, 5000)
          );

          continue;
        }

        throw err;
      }
    }

    console.log("===== GEMINI RAW RESPONSE =====");
    console.log(response.text);

    let parsedResponse;

try {

  parsedResponse = JSON.parse(response.text);

} catch (err) {

  console.log("===== INVALID JSON FROM GEMINI =====");
  console.log(response.text);

  throw new Error("Gemini returned invalid JSON");
}


    console.log("===== GEMINI PARSED RESPONSE =====");
    console.log(parsedResponse);

    return parsedResponse;

  } catch (error) {

    console.error("===== GEMINI ERROR =====");
    console.error(error);

    throw error;
  }
}

async function generatePdfFromHtml(htmlContent) {

  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.setContent(htmlContent, {
    waitUntil: "networkidle0"
  });

  const pdfBuffer = await page.pdf({
    format: "A4"
  });

  await browser.close();

  return pdfBuffer;
}

const resumePdfSchema = z.object({
  html: z.string().describe(
    "Complete HTML content of the resume that can be converted to PDF"
  )
});

 async function generateResumePdf({
  resume,
  selfDescription,
  jobDescription
}) {

 const prompt = `
Create a complete professional ATS-friendly resume.
Keep the resume compact.
Minimize vertical spacing.
Reduce section margins and padding.
Fit content efficiently within 1-2 pages.
Avoid unnecessary white space.
Do not leave large blank areas between sections.
Use compact professional formatting.


Return ONLY JSON.

The JSON must contain exactly one field:

{
  "html": "<complete HTML document>"
}

Requirements:
- html must contain a full HTML document
- include <!DOCTYPE html>
- include head and body tags
- use professional resume styling
- tailor the resume according to the job description
- do not return markdown
- do not return explanations
- do not return any fields except html

Layout Requirements:
- Resume must fit within 2 pages maximum
- Use font size between 12px and 14px
- Use full page width efficiently
- Avoid excessive vertical spacing
- Keep skills in compact horizontal format
- Use compact margins
- Use professional ATS-friendly layout
- Maximum 3 bullet points per project
- Maximum 2 bullet points per experience
- Avoid unnecessary blank spaces


CSS Requirements:
- Use page-break-inside: avoid for sections
- Use break-inside: avoid where appropriate

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(resumePdfSchema)
    }
  });

 const jsonContent = JSON.parse(response.text);

if (!jsonContent.html) {
  throw new Error(
    `Gemini did not return html field. Response: ${response.text}`
  );
}

  const pdfBuffer = await generatePdfFromHtml(
    jsonContent.html
  );

   console.log("===== GEMINI PDF RESPONSE =====");
console.log(response.text);

console.log("===== PARSED JSON =====");
console.log(jsonContent);

console.log("===== HTML CONTENT =====");
console.log(jsonContent.html);
  return pdfBuffer;
}


module.exports = {
  invokeGeminiAi,
  generateInterviewReport,
  generateResumePdf
};