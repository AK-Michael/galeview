import React from "react";
import styles from "./Spinner.module.css";

const Spinner = ({ fullscreen = true }) => {
  return (
    <div
      className={fullscreen ? styles.spinnerWrapper : styles.inlineWrapper}
      role="status"
      aria-label="Loading"
    >
      <div className={styles.spinner} />
    </div>
  );
};

export default Spinner;
