import React from "react";
import "./CredentialsInputBox.css";

export default function CredentialsInputBox() {
  return (
    <div className="cred-layout">
      <b className="cred-input-header">Email</b>
      <input
        className="cred-inputbox"
        type="text"
        name="name"
        placeholder="utorid@utoronto.ca"
      />
      <b className="cred-input-header">Password</b>
      <input className="cred-inputbox" type="password" name="name" />
    </div>
  );
}
