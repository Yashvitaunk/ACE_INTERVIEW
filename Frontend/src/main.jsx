import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./style.scss";
import "remixicon/fonts/remixicon.css";

import { AuthProvider } from "./AuthContext"; // path apne project ke hisab se

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);