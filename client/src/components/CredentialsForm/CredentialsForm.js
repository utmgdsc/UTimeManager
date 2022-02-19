import React from "react";
import CredentialsInputBox from "../CredentialsInputBox/CredentialsInputBox.js";
import { ThemeText } from "../ThemeText/ThemeText.js";
import { CredentialsButton } from "../CredentialsButton/CredentialsButton.js";
import { DescriptiveTextButton } from "../DescriptiveTextButton/DescriptiveTextButton.js";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const CredentialsForm = ({
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
    <>
      <div style={{ marginBottom: "3px" }}>
        <ThemeText primary={true} text={headerText} />
      </div>
      <ThemeText primary={false} text={subtitleText} />
      <CredentialsInputBox errorMessage="This is a super long error message that can be editted." />
      <div>
        <CredentialsButton text={actionText} />
      </div>
      <DescriptiveTextButton
        desc={nextPageDescription}
        nextPageText={" " + nextPageText}
        onClick={routeToNextPage}
      />
    </>
  );
};

CredentialsForm.propTypes = {
  headerText: PropTypes.string.isRequired,
  subtitleText: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  nextPage: PropTypes.string.isRequired,
  nextPageDescription: PropTypes.string.isRequired,
  nextPageText: PropTypes.string.isRequired,
};

export default CredentialsForm;
