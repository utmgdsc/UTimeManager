import React from "react";
import CredentialsForm from "../../components/CredentialsForm/CredentialsForm";
import styles from "./CredentialsPage.module.css";

const SignUpPage = () => {
  return (
    <div className={styles.bg}>
      <div className={styles.credentials_container}>
        <CredentialsForm
          headerText="Sign Up"
          subtitleText="Create an account to continue"
          actionText="Join Us"
          nextPage="/"
          nextPageDescription="Already have an account?"
          nextPageText="Sign In"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
