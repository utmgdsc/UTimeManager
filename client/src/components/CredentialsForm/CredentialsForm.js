import React, { useState } from "react";
import { ThemeText } from "../ThemeText/ThemeText.js";
import { CredentialsButton } from "../CredentialsButton/CredentialsButton.js";
import { DescriptiveTextButton } from "../DescriptiveTextButton/DescriptiveTextButton.js";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./CredentialsForm.module.css";
import { InputBox } from "../InputBox/InputBox";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { instance } from "../../axios";
import Cookies from "universal-cookie";

const CredentialsForm = ({
  headerText,
  subtitleText,
  actionText,
  nextPage,
  nextPageDescription,
  nextPageText,
  submitURL,
  errorMessage,
  landingPage,
}) => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const routeToNextPage = () => {
    navigate(nextPage);
  };

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showError, setShowError] = useState(false);

  const formSubmitHandler = async () => {
    // TODO: The portion below will need to change as we start adding in our other features
    if (credentials.email && credentials.password) {
      await instance
        .post(submitURL, credentials)
        .then(() => {
          setShowError(false);
          cookie.set("isLoggedIn", true);
          navigate(landingPage);
          window.location.reload();
        })
        .catch(() => {
          setShowError(true);
        });
    }
  };

  const setUpdatedCredentials = (e, value) => {
    const newCredentials = { ...credentials };
    newCredentials[value] = e.target.value;
    setCredentials(newCredentials);
  };

  return (
    <div className={styles.credentials_container}>
      <div style={{ marginBottom: "3px" }}>
        <ThemeText primary={true} text={headerText} />
      </div>
      <ThemeText primary={false} text={subtitleText} />
      <div className={styles.credLayout}>
        <InputBox
          value={credentials.email}
          type={"email"}
          onChange={(e) => setUpdatedCredentials(e, "email")}
          placeholder={"utorid@utoronto.ca"}
          header={"Email"}
        />
        <InputBox
          value={credentials.password}
          type={"password"}
          onChange={(e) => setUpdatedCredentials(e, "password")}
          placeholder={"Password"}
          header={"Password"}
        />
        {showError ? <ErrorMessage errorMessage={errorMessage} /> : <></>}
      </div>
      <CredentialsButton text={actionText} authAction={formSubmitHandler} />
      <DescriptiveTextButton
        desc={nextPageDescription}
        nextPageText={" " + nextPageText}
        onClick={routeToNextPage}
      />
    </div>
  );
};

CredentialsForm.propTypes = {
  headerText: PropTypes.string.isRequired,
  subtitleText: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  nextPage: PropTypes.string.isRequired,
  nextPageDescription: PropTypes.string.isRequired,
  nextPageText: PropTypes.string.isRequired,
  submitURL: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  landingPage: PropTypes.string.isRequired,
};

export default CredentialsForm;
