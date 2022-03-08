import React, { useState } from "react";
import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../redux/cartRedux";
import WarningModal from "../components/WarningModal";

const Cart = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.cart);

  const [warning, setWarning] = useState(false);

  const handleCancel = () => {
    dispatch(reset());
  };

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
          {orders?.products.map((order) => (
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
                {order?.extrasChoose?.map((extra) => (
                  <span className={styles.extras}>{extra.text} </span>
                ))}
              </td>
              <td>
                <span className={styles.price}>{order.price}</span>
              </td>
              <td>
                <span className={styles.quantity}>{order.quantity}</span>
              </td>
              <td>
                <span className={styles.total}>${order.productTotal}</span>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b> ${orders.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b> $0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b> ${orders.total}
          </div>
          {orders.quantity !== 0 && (
            <>
              <button className={styles.button}>CHECKOUT NOW!</button>
              <button
                className={styles.button}
                onClick={() => setWarning(true)}
              >
                CANCEL!
              </button>
            </>
          )}
        </div>
      </div>
      {warning && <WarningModal cancel={handleCancel} warning={setWarning} />}
    </div>
  );
};

export default Cart;
