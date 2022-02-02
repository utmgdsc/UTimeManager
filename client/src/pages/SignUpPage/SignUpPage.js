import React, { useEffect } from "react";
import CredentialsInputBox from "../../components/CredentialsInputBox/CredentialsInputBox.js";
import {
  HeaderText,
  SubtitleText,
} from "../../components/ThemeText/ThemeText.js";
import { CredentialsButton } from "../../components/CredentialsButton/CredentialsButton.js";

import "./SignUpPage.css";

const SignUpPage = () => {
  useEffect(() => {
    document.body.style.background = "#032A5C";
  });
  return (
    <div className="login-container">
      <div style={{ marginBottom: "3px" }}>
        <HeaderText data="Sign Up" />
      </div>
      <div style={{ marginBottom: "10%" }}>
        <SubtitleText data="Create an account to continue" />
      </div>
      <div style={{ marginBottom: "15%" }}>
        <CredentialsInputBox />
      </div>
      <div>
        <CredentialsButton data="Join Us" />
      </div>
    </div>
  );
};

export default SignUpPage;
