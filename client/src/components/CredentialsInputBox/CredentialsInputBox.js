import React from "react";
import "./CredentialsInputBox.css";

export default function CredentialsInputBox() {
  return (
    <div className="cred-layout">
      <b>Email</b>
      <input type="text" name="name" placeholder="utorid@utoronto.ca" />
      <b>Password</b>
      <input type="password" name="name" />
    </div>
  );
}
