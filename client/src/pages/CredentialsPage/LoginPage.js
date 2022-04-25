import React from "react";
import CredentialsForm from "../../components/CredentialsForm/CredentialsForm";
import styles from "./CredentialsPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.bg}>
      <CredentialsForm
        headerText="UTimeManager"
        subtitleText="Please sign in to continue"
        actionText="Login"
        nextPage="signup"
        nextPageDescription="Don't have an account?"
        nextPageText="Sign Up"
        submitURL="/users/login"
        errorMessage={"Invalid username or password"}
      />
    </div>
  );
};

export default LoginPage;
