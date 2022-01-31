import React from "react";
import "./CredentialsButton.css";
import { PropTypes } from "prop-types";

export const CredentialsButton = ({ data, onClick }) => {
  return (
    <button className="credentials" onClick={onClick}>
      {" "}
      {data}{" "}
    </button>
  );
};

CredentialsButton.propTypes = {
  data: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
