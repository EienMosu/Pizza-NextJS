import React, { useState } from "react";
import styles from "../styles/CashModal.module.css";

const CashModal = ({ total, createOrder, close }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleOrder = () => {
    const data = {
      customer,
      address,
      total,
      method: 0,
    };

    createOrder(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => close(false)} className={styles.close}>
          X
        </span>
        <h1 className={styles.title}>You will pay $12 after delivery.</h1>
        <div className={styles.item}>
          <label className={styles.label}>Full Name: </label>
          <input
            type="text"
            placeholder="Dexter Morgan"
            className={styles.input}
            onChange={(event) => setCustomer(event.target.value)}
            value={customer}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address: </label>
          <input
            type="text"
            placeholder="1234, NY City"
            className={styles.input}
            onChange={(event) => setAddress(event.target.value)}
            value={address}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone: </label>
          <input
            type="number"
            placeholder="+123 456 78 90"
            className={styles.input}
            onChange={(event) => setPhone(event.target.value)}
            value={phone}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={() => handleOrder()} className={styles.order}>
            Order
          </button>
          <button onClick={() => close(false)} className={styles.cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashModal;
