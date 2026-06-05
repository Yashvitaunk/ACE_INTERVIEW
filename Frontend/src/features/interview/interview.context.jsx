import { createContext, useState} from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [lloading, setLoading] = useState(false)
  const [interviewData, setInterviewData] = useState(null)

  return (
    <InterviewContext.Provider value={{ lloading, setLoading, interviewData, setInterviewData }}>
      {children}
    </InterviewContext.Provider>
  )
}