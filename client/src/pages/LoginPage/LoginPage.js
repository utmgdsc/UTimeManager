import React, { useEffect } from "react";
import CredentialsInputBox from "../../components/CredentialsInputBox/CredentialsInputBox.js";
import {
  HeaderText,
  SubtitleText,
} from "../../components/ThemeText/ThemeText.js";
import { CredentialsButton } from "../../components/CredentialsButton/CredentialsButton.js";
import { DescriptiveTextButton } from "../../components/DescriptiveTextButton/DescriptiveTextButton.js";
import { useNavigate } from "react-router-dom";

import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const routeToSignUp = () => {
    navigate("signup");
  };

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
        <DescriptiveTextButton
          desc="Don't have an account?"
          data=" Sign Up"
          onClick={routeToSignUp}
        />
      </div>
    </div>
  );
};

export default LoginPage;
