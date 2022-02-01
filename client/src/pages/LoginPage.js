import React, { useEffect } from "react";
import CredentialsInputBox from "../components/CredentialsInputBox/CredentialsInputBox.js";
import { HeaderText, SubtitleText } from "../components/ThemeText/ThemeText.js";
import { CredentialsButton } from "../components/CredentialsButton/CredentialsButton.js";

import "./LoginPage.css";

const LoginPage = () => {
  useEffect(() => {
    document.body.style.background = "#032A5C";
  });
  return (
    <div className="login-container">
      <div style={{ paddingBottom: "5px" }}>
        {" "}
        <HeaderText data="UTimeManager" />{" "}
      </div>
      <div style={{ paddingBottom: "5px" }}>
        {" "}
        <SubtitleText data="Please sign in to continue" />{" "}
      </div>
      <div style={{ paddingTop: "10px" }}>
        {" "}
        <CredentialsInputBox />{" "}
      </div>
      <div style={{ paddingTop: "10px" }}>
        {" "}
        <CredentialsButton data="Login" />{" "}
      </div>
    </div>
  );
};

export default LoginPage;
