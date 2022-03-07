import React from "react";
import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";

const Cart = () => {
  const orders = useSelector((state) => state.cart);

  console.log(orders);

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <table className={styles.table}>
          <tr className={styles.trTitle}>
            <th>Product</th>
            <th>Name</th>
            <th>Size</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {orders &&
            orders.products.map((order) => (
              <tr className={styles.tr}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      alt=""
                      src={order.img}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{order.name}</span>
                </td>
                <td>{order.choosenSize}</td>
                <td>
                  {orders.products?.extrasChoose?.map((extra) => (
                    <span className={styles.extras}>{extra.text}</span>
                  ))}
                </td>
                <td>
                  <span className={styles.price}>{order.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{order.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>${order.total}</span>
                </td>
              </tr>
            ))}
        </table>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b> $79.60
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b> $0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b> $79.60
          </div>
          <button className={styles.button}>CHECKOUT NOW!</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
