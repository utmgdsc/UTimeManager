import React from "react";
import styles from "./PageNotFound.module.css";
import { ThemeText } from "../../components/ThemeText/ThemeText.js";

const PageNotFound = () => {
  return (
    <div className={styles.bg}>
      <div className={styles.message_box}>
        <div className={styles.oops}>Oops ...</div>
        <div className={styles.not_found}>Page was not found</div>
        <div style={{ marginTop: "10%", marginBottom: "10%" }}>
          <hr />
        </div>
        <ThemeText primary={true} text="UTimeManager" />
      </div>
    </div>
  );
};

export default PageNotFound;
