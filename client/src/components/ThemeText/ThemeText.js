import React from "react";
import PropTypes from "prop-types";
import "./ThemeText.css";

export const HeaderText = ({ data }) => {
  return <div className="headerText"> {data} </div>;
};

export const SubtitleText = ({ data }) => {
  return <div className="subtitleText"> {data} </div>;
};

HeaderText.propTypes = {
  data: PropTypes.string,
};

SubtitleText.propTypes = {
  data: PropTypes.string,
};
