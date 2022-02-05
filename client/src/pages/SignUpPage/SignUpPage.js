import React, { useEffect } from "react";
import CredentialsInputBox from "../../components/CredentialsInputBox/CredentialsInputBox.js";
import {
  HeaderText,
  SubtitleText,
} from "../../components/ThemeText/ThemeText.js";
import { CredentialsButton } from "../../components/CredentialsButton/CredentialsButton.js";
import { DescriptiveTextButton } from "../../components/DescriptiveTextButton/DescriptiveTextButton.js";
import { useNavigate } from "react-router-dom";

import "./SignUpPage.css";

const SignUpPage = () => {
  const navigate = useNavigate();
  const routeToLogin = () => {
    navigate("/");
  };

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
      <div style={{ marginBottom: "10%" }}>
        <CredentialsInputBox />
      </div>
      <div>
        <CredentialsButton data="Join Us" />
      </div>
      <div style={{ marginTop: "40%" }}>
        <DescriptiveTextButton
          desc="Already have an account?"
          data=" Sign In"
          onClick={routeToLogin}
        />
      </div>
    </div>
  );
};

export default SignUpPage;
