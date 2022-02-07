import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.js";
import SignUpPage from "./pages/SignUpPage/SignUpPage.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
