import axios from "axios";
import React, { useState } from "react";
import styles from "../styles/AddPizzaButton.module.css";
import { useRouter } from "next/router";

const AddPizzaButton = ({ setAddPizza }) => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [prices, setPrices] = useState([]);
  const [file, setFile] = useState(null);
  const [extraList, setExtraList] = useState([{ name: "", price: "" }]);

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");

    try {
      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dcoekeyfy/image/upload",
        data
      );

      const { url } = uploadResponse.data;
      const newProduct = {
        title,
        desc,
        img: url,
        prices,
        extraOptions: extraList,
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/api/products",
          newProduct
        );

        console.log(response);
        setAddPizza(false);
        router.push("/");
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePriceChange = (event, index) => {
    const currentPrices = prices;
    currentPrices[index] = event.target.value;
    setPrices(currentPrices);
  };

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
          <input
            className={styles.mainInput}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.mainLabel}>Description</label>
          <textarea
            className={styles.descInput}
            type="text"
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
          />
        </div>
        <div className={styles.imgWrapper}>
          <label className={styles.mainLabel}>Upload Image:</label>
          <input
            className={styles.fileInput}
            type="file"
            onChange={(event) => setFile(event.target.files[0])}
          />
        </div>
        <div className={styles.item}>
          <h3 className={styles.subTitle}>Prices</h3>
          <div className={styles.prices}>
            <label className={styles.subLabel}>Small:</label>
            <input
              className={styles.pricesInput}
              type="number"
              onChange={(event) => handlePriceChange(event, 0)}
            />
            <label className={styles.subLabel}>Medium:</label>
            <input
              className={styles.pricesInput}
              type="number"
              onChange={(event) => handlePriceChange(event, 1)}
            />
            <label className={styles.subLabel}>Large:</label>
            <input
              className={styles.pricesInput}
              type="number"
              onChange={(event) => handlePriceChange(event, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <h3 className={styles.subTitle}>Extra Options</h3>
          {extraList.map((x, index) => (
            <div className={styles.extras}>
              <label className={styles.subLabel}>Name:</label>
              <input
                name="text"
                value={x.text}
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
                  onClick={() => handleRemoveClick(index)}
                >
                  - Remove
                </button>
              )}
              {extraList.length - 1 === index && (
                <button className={styles.add} onClick={handleAddClick}>
                  + Add
                </button>
              )}
            </div>
          ))}
        </div>
        <div className={styles.buttonWrapper}>
          <button onClick={() => handleCreate()} className={styles.submit}>
            Create New Pizza
          </button>
          <button onClick={() => setAddPizza(false)} className={styles.cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPizzaButton;
