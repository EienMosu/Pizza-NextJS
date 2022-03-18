import React, { useState } from "react";
import styles from "../styles/AddPizzaButton.module.css";

const AddPizzaButton = ({ setAddPizza }) => {
  const [extraList, setExtraList] = useState([{ name: "", price: "" }]);

  const handleExtraInputChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...extraList];
    list[index][name] = value;
    setExtraList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...extraList];
    list.splice(index, 1);
    setExtraList(list);
  };

  const handleAddClick = () => {
    setExtraList([...extraList, { name: "", price: "" }]);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Pizza</h1>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <label className={styles.mainLabel}>Name</label>
          <input className={styles.mainInput} type="text" />
        </div>
        <div className={styles.item}>
          <label className={styles.mainLabel}>Description</label>
          <textarea className={styles.descInput} type="text" />
        </div>
        <div className={styles.imgWrapper}>
          <label className={styles.mainLabel}>Upload Image:</label>
          <input className={styles.fileInput} type="file" />
        </div>
        <div className={styles.item}>
          <h3 className={styles.subTitle}>Prices</h3>
          <div className={styles.prices}>
            <label className={styles.subLabel}>Small:</label>
            <input className={styles.pricesInput} type="number" />
            <label className={styles.subLabel}>Medium:</label>
            <input className={styles.pricesInput} type="number" />
            <label className={styles.subLabel}>Big:</label>
            <input className={styles.pricesInput} type="number" />
          </div>
        </div>
        <div className={styles.item}>
          <h3 className={styles.subTitle}>Extra Options</h3>
          {extraList.map((x, i) => (
            <div className={styles.extras}>
              <label className={styles.subLabel}>Name:</label>
              <input
                name="name"
                value={x.name}
                onChange={(event) => handleExtraInputChange(event, index)}
                className={styles.extrasInput}
                type="text"
              />
              <label className={styles.subLabel}>Price:</label>
              <input
                name="price"
                value={x.price}
                onChange={(event) => handleExtraInputChange(event, index)}
                className={styles.extrasInput}
                type="number"
              />
              {extraList.length !== 1 && (
                <button
                  className={styles.remove}
                  onClick={() => handleRemoveClick(i)}
                >
                  - Remove
                </button>
              )}
              {extraList.length - 1 === i && (
                <button className={styles.add} onClick={handleAddClick}>
                  + Add
                </button>
              )}
            </div>
          ))}
        </div>
        <div className={styles.buttonWrapper}>
          <button className={styles.submit}>Create New Pizza</button>
          <button onClick={() => setAddPizza(false)} className={styles.cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPizzaButton;
