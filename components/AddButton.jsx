import React from "react";
import styles from "../styles/AddButton.module.css";

const AddButton = ({ setAddPizza }) => {
  return (
    <div className={styles.container}>
      <button onClick={() => setAddPizza(true)} className={styles.addButton}>
        Add New Pizza
      </button>
    </div>
  );
};

export default AddButton;
