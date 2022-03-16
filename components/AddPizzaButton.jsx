import React from "react";
import styles from "../styles/AddPizzaButton.module.css";

const AddPizzaButton = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Pizza</h1>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <label className={styles.mainLabel}>Name</label>
          <input type="text" />
        </div>
        <div className={styles.item}>
          <label className={styles.mainLabel}>Description</label>
          <input type="text" />
        </div>
        <div className={styles.item}>
          <label className={styles.mainLabel}>Upload Image</label>
          <input type="file" />
        </div>
        <div className={styles.item}>
          <h3 className={styles.subTitle}>Prices</h3>
          <div className={styles.prices}>
            <label className={styles.subLabel}>Small Size Price</label>
            <input type="number" />
          </div>
          <div className={styles.prices}>
            <label className={styles.subLabel}>Medium Size Price</label>
            <input type="number" />
          </div>
          <div className={styles.prices}>
            <label className={styles.subLabel}>Big Size Price</label>
            <input type="number" />
          </div>
        </div>
        <div className={styles.item}>
          <h3 className={styles.subTitle}>Extra Options</h3>
          <div className={styles.extras}>
              <label className={styles.subLabel}>Extra Option Name</label>
              <input type="text" />
              <label className={styles.subLabel}>Extra Option Price</label>
              <input type="number" />
              <button className={styles.add}>+ Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPizzaButton;
