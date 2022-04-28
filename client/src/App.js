import React from "react";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import LoginPage from "./pages/CredentialsPage/LoginPage.js";
import SignUpPage from "./pages/CredentialsPage/SignUpPage.js";
import PageNotFound from "./pages/PageNotFound/PageNotFound.js";
import CalendarPage from "./pages/CalendarPage/CalendarPage.js";
import TaskHistoryPage from "./pages/TaskHistoryPage/TaskHistoryPage.js";
import InsightsPage from "./pages/InsightsPage/InsightsPage.js";
import TaskFormPage from "./pages/TaskFormPage/TaskFormPage.js";
import Cookies from "universal-cookie";

const App = () => {
  const cookies = new Cookies();
  const isLoggedIn = cookies.get("isLoggedIn");
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn && <Route path="/task_form" element={<TaskFormPage />} />}
        {isLoggedIn && <Route path="/insights" element={<InsightsPage />} />}
        {isLoggedIn && (
          <Route path="/task_history" element={<TaskHistoryPage />} />
        )}
        {isLoggedIn && <Route path="/calendar" element={<CalendarPage />} />}
        <Route path="/" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
