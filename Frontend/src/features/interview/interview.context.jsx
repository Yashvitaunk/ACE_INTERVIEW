import { createContext, useState} from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState(false)
  const [interviewData, setInterviewData] = useState(null)

  return (
    <InterviewContext.Provider value={{ loading, setLoading, report, setReport, interviewData, setInterviewData }}>
      {children}
    </InterviewContext.Provider>
  )
}