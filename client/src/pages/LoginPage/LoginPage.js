import React, { useEffect } from "react";
import CredentialsInputBox from "../../components/CredentialsInputBox/CredentialsInputBox.js";
import {
  HeaderText,
  SubtitleText,
} from "../../components/ThemeText/ThemeText.js";
import { CredentialsButton } from "../../components/CredentialsButton/CredentialsButton.js";
import { DescriptiveTextButton } from "../../components/DescriptiveTextButton/DescriptiveTextButton.js";

import "./LoginPage.css";

const LoginPage = () => {
  useEffect(() => {
    document.body.style.background = "#032A5C";
  });
  return (
    <div className="login-container">
      <div style={{ marginBottom: "3px" }}>
        <HeaderText data="UTimeManager" />
      </div>
      <div style={{ marginBottom: "10%" }}>
        <SubtitleText data="Please sign in to continue" />
      </div>
      <div style={{ marginBottom: "10%" }}>
        <CredentialsInputBox />
      </div>
      <div>
        <CredentialsButton data="Login" />
      </div>
      <div style={{ marginTop: "40%" }}>
        <DescriptiveTextButton desc="Don't have an account?" data=" Sign Up" />
      </div>
    </div>
  );
};

export default LoginPage;
