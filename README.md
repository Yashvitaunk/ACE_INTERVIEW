# 🚀 ACE_INTERVIEW

AI-powered Interview Preparation Platform that analyzes resumes, compares them with job descriptions, identifies skill gaps, generates personalized interview questions, and creates tailored preparation roadmaps.

---

## 📌 Features

| Feature | Description |
|----------|-------------|
| Resume Analysis | Extracts and analyzes resume content using AI |
| Job Description Matching | Compares resume against target job requirements |
| Match Score | Calculates candidate-job compatibility score |
| Technical Questions | Generates role-specific technical interview questions |
| Behavioral Questions | Generates behavioral interview questions with model answers |
| Skill Gap Analysis | Identifies missing skills and improvement areas |
| Personalized Roadmap | Creates structured interview preparation plans |
| Resume PDF Generator | Generates tailored resumes based on target roles |
| Authentication System | Secure Login/Register using JWT Authentication |
| User-specific Reports | Every user can access only their own interview reports |

---

## 🛠️ Tech Stack

| Category | Technologies |
|-----------|-------------|
| Frontend | React.js, React Router, SCSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, Cookies |
| AI Integration | Google Gemini API |
| Resume Parsing | pdf-parse |
| File Uploads | Multer |
| PDF Generation | Puppeteer |

---

## 📂 Project Structure

| Folder | Purpose |
|----------|----------|
| Frontend | React Frontend Application |
| backend | Express Backend API |
| backend/src/controllers | Business Logic |
| backend/src/routes | API Routes |
| backend/src/models | MongoDB Models |
| backend/src/services | AI Services |
| backend/src/middlewares | Authentication & File Upload Middleware |

---

## 🔐 Authentication Features

| Functionality | Status |
|---------------|---------|
| User Registration | ✅ |
| User Login | ✅ |
| JWT Authentication | ✅ |
| Protected Routes | ✅ |
| Logout Functionality | ✅ |
| User-Specific Data Access | ✅ |

---

## 📊 Generated Interview Report Includes

| Component | Description |
|------------|-------------|
| Match Score | Resume vs Job Description Compatibility |
| Technical Questions | AI-generated technical questions |
| Behavioral Questions | AI-generated behavioral questions |
| Skill Gaps | Missing skills required for role |
| Preparation Plan | Personalized learning roadmap |
| Tailored Resume | Downloadable AI-generated resume |

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ACE_INTERVIEW.git
```

### Install Frontend Dependencies

```bash
cd Frontend
npm install
```

### Install Backend Dependencies

```bash
cd ../backend
npm install
```

### Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=3000

MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### Run Backend

```bash
npm run dev
```

### Run Frontend

```bash
cd Frontend
npm run dev
```

---

## 📸 Screenshots

| Page | Preview |
|--------|---------|
| Login Page | Add Screenshot |
| Dashboard | Add Screenshot |
| Interview Report | Add Screenshot |
| Resume Generator | Add Screenshot |

---

## 🎯 Future Enhancements

| Enhancement | Status |
|-------------|---------|
| Mock Interview Simulator | 🔄 Planned |
| Voice-based Interview Practice | 🔄 Planned |
| AI Feedback on Answers | 🔄 Planned |
| Company-wise Interview Sets | 🔄 Planned |
| Deployment | 🔄 Planned |

---

## 👨‍💻 Author

**YASHVI TAUNK **
GitHub: https://github.com/Yashvitaunk

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.