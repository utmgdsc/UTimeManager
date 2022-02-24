import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/CredentialsPage/LoginPage.js";
import SignUpPage from "./pages/CredentialsPage/SignUpPage.js";
import PageNotFound from "./pages/PageNotFound/PageNotFound.js";
import TaskFormPage from "./pages/TaskFormPage/TaskFormPage.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskFormPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
