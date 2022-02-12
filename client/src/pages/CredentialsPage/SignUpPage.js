import React from "react";
import CredentialsPage from "./CredentialsPage";

const SignUpPage = () => {
  return (
    <CredentialsPage
      headerText="Sign Up"
      subtitleText="Create an account to continue"
      actionText="Join Us"
      nextPage="/"
      nextPageDescription="Already have an account?"
      nextPageText="Sign In"
    />
  );
};

export default SignUpPage;
