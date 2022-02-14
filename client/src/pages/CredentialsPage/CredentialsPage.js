import React from "react";
import CredentialsInputBox from "../../components/CredentialsInputBox/CredentialsInputBox.js";
// import {
//   HeaderText,
//   SubtitleText,
// } from "../../components/ThemeText/ThemeText.js";

import { ThemeText } from "../../components/ThemeText/ThemeText.js";
import { CredentialsButton } from "../../components/CredentialsButton/CredentialsButton.js";
import { DescriptiveTextButton } from "../../components/DescriptiveTextButton/DescriptiveTextButton.js";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./CredentialsPage.module.css";

const CredentialsPage = ({
  headerText,
  subtitleText,
  actionText,
  nextPage,
  nextPageDescription,
  nextPageText,
}) => {
  const navigate = useNavigate();
  const routeToNextPage = () => {
    navigate(nextPage);
  };

  return (
    <div className={styles.bg}>
      <div className={styles.credentials_container}>
        <div style={{ marginBottom: "3px" }}>
          <ThemeText primary={true} text={headerText} />
        </div>
        <ThemeText primary={false} text={subtitleText} />
        <CredentialsInputBox />
        <div>
          <CredentialsButton data={actionText} />
        </div>
        <DescriptiveTextButton
          desc={nextPageDescription}
          data={" " + nextPageText}
          onClick={routeToNextPage}
        />
      </div>
    </div>
  );
};

CredentialsPage.propTypes = {
  headerText: PropTypes.string.isRequired,
  subtitleText: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  nextPage: PropTypes.string.isRequired,
  nextPageDescription: PropTypes.string.isRequired,
  nextPageText: PropTypes.string.isRequired,
};

export default CredentialsPage;
