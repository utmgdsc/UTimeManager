import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/CredentialsPage/LoginPage.js";
import SignUpPage from "./pages/CredentialsPage/SignUpPage.js";
import PageNotFound from "./pages/PageNotFound/PageNotFound.js";
import CalendarPage from "./pages/CalendarPage/CalendarPage.js";
import TaskHistoryPage from "./pages/TaskHistoryPage/TaskHistoryPage.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/task_history" element={<TaskHistoryPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
