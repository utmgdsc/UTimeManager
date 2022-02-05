import React from "react";
import "./DescriptiveTextButton.css";
import { PropTypes } from "prop-types";

export const DescriptiveTextButton = ({ desc, data, onClick }) => {
  return (
    <div className="no-account-text">
      {desc}
      <button className="no-account-button" onClick={onClick}>
        {data}
      </button>
    </div>
  );
};

DescriptiveTextButton.propTypes = {
  desc: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
