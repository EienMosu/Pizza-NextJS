import React from "react";
import styles from "../../styles/Admin.module.css";
import Image from "next/image";

const index = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          <tbody>
            <tr className={styles.trTitle}>
              <td>
                <Image
                  src="/img/pizza.png"
                  width={50}
                  height={50}
                  objectFit="cover"
                  alt=""
                />
              </td>
              <td>Pizza ID</td>
              <td>Pizza Title</td>
              <td>$50</td>
              <td>
                <button className={styles.button}>Edit</button>
                <button className={styles.button}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.item}>
        <table className={styles.table}>
          <h1 className={styles.title}>Orders</h1>
          <tbody>
            <tr className={styles.trTitle}>
              <th>ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          <tbody>
            <tr className={styles.trTitle}>
              <td>312312565478</td>
              <td>Debra Morgan</td>
              <td>$50</td>
              <td>Paid</td>
              <td>Preparing</td>
              <td>
                <button>Next Stage</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default index;
