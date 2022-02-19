import React from "react";
import CredentialsForm from "../../components/CredentialsForm/CredentialsForm";
import styles from "./CredentialsPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.bg}>
      <div className={styles.credentials_container}>
        <CredentialsForm
          headerText="UTimeManager"
          subtitleText="Please sign in to continue"
          actionText="Login"
          nextPage="signup"
          nextPageDescription="Don't have an account?"
          nextPageText="Sign Up"
        />
      </div>
    </div>
  );
};

export default LoginPage;
