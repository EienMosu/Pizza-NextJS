import React from "react";
import styles from "../styles/WarningModal.module.css";

const WarningModal = ({ cancel, warning }) => {

  const handleYes = () => {
    cancel();
    warning(false);
  };

  const handleNo = () => {
    warning(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Warning!</h1>
        <span className={styles.desc}>
          Are you sure about cancel and delete all orders!
        </span>
        <div className={styles.buttonContainer}>
          <button onClick={() => handleYes()} className={styles.yes}>
            Yes!
          </button>
          <button onClick={() => handleNo()} className={styles.no}>
            No!
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
