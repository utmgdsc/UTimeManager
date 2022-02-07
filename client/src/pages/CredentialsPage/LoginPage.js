import React from "react";
import CredentialsPage from "./CredentialsPage";

const LoginPage = () => {
  return (
    <CredentialsPage
      headerText="UTimeManager"
      subtitleText="Please sign in to continue"
      actionText="Login"
      nextPage="signup"
      nextPageDescription="Don't have an account?"
      nextPageText="Sign Up"
    />
  );
};

export default LoginPage;
