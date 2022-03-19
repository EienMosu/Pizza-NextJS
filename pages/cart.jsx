import React, { useState, useEffect } from "react";
// CSS
import styles from "../styles/Cart.module.css";
// NextJS
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../redux/cartRedux";
// Components
import WarningModal from "../components/WarningModal";
import CashModal from "../components/CashModal";
// Paypal
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
// Axios
import axios from "axios";

const Cart = () => {
  // This values are the props in the UI
  const amount = "2";
  const currency = "USD";
  const style = { layout: "vertical" };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function () {
              // Your code here after capture the order
            });
          }}
        />
      </>
    );
  };

  //Redux
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.cart);

  // States
  const [warning, setWarning] = useState(false);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);

  const router = useRouter();

  const createOrder = async (data) => {
    try {
      const response = await axios.post(
        `https://angry-swartz-81a245.netlify.app/api/orders`,
        data
      );

      response.status === 201 && router.push("/orders/" + response.data._id);
      dispatch(reset());
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    dispatch(reset());
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Size</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
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
                <td>
                  {order.choosenSize === 0
                    ? "Small Size"
                    : order.choosenSize === 1
                    ? "Medium Size"
                    : "Big Size"}
                </td>
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
          </tbody>
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
              {open ? (
                <div className={styles.paymentMethods}>
                  <h1 className={styles.paymentTitle}>PAYMENT METHODS</h1>
                  <button className={styles.cash} onClick={() => setCash(true)}>
                    CASH ON DELIVERY!
                  </button>
                  <PayPalScriptProvider
                    options={{
                      "client-id": "test",
                      components: "buttons",
                      currency: "USD",
                      "disable-funding": "credit,card,p24",
                    }}
                  >
                    <ButtonWrapper currency={currency} showSpinner={false} />
                  </PayPalScriptProvider>
                </div>
              ) : (
                <button onClick={() => setOpen(true)} className={styles.button}>
                  CHECKOUT NOW!
                </button>
              )}
              <button
                className={styles.button}
                onClick={() => setWarning(true)}
              >
                CANCEL!
              </button>
            </>
          )}
          <Link href="/">
            <button className={styles.button}>KEEP SHOPPING!</button>
          </Link>
        </div>
      </div>
      {warning && <WarningModal cancel={handleCancel} warning={setWarning} />}
      {cash && <CashModal total={orders.total} createOrder={createOrder} close={setCash}/>}
    </div>
  );
};

export default Cart;
