import React from "react";
import styles from "../../styles/Admin.module.css";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

const Index = ({ orders, products }) => {
  const router = useRouter();
  const status = ["Preparing", "On the Way", "Delivered"];

  const handleDelete = async (id) => {
    // try {
    //   const response = await axios.delete(
    //     `http://localhost:3000/api/products/${id}`
    //   );

    //   console.log(response);
    //   router.reload(window.location.pathname);
    // } catch (err) {
    //   console.log(err);
    // }

    console.log("Cannot let you delete!")
  };

  const handleEdit = async () => {
    const data = {};

    try {
      const response = await axios.put(
        `http://localhost:3000/api/products/${id}`,
        data
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const currentOrder = orders.filter((order) => order._id === id);
    const data = {
      status: currentOrder[0].status + 1,
    };

    if (data.status <= 2) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/orders/${id}`,
          data
        );

        console.log(response);
        router.reload(window.location.pathname);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/orders/${id}`
        );

        console.log(response);
        router.reload(window.location.pathname);
      } catch (err) {
        console.log(err);
      }
    }
  };

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
            {products.map((product) => (
              <tr className={styles.trTitle} key={product._id}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id}</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button
                    onClick={() => handleEdit(product._id)}
                    className={styles.button}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className={styles.button}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          <tbody>
            {orders.map((order) => (
              <tr className={styles.trTitle} key={order._id}>
                <td>{order._id}</td>
                <td>{order.customer}</td>
                <td>{order.address}</td>
                <td>${order.total}</td>
                <td>{order.method === 0 ? "Cash On Delivery" : "Paid"}</td>
                <td>{status[order.status]}</td>
                <td>
                  <button onClick={() => handleStatus(order._id)}>
                    {order.status === 2 ? "Finish Order" : "Next Stage"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if ((myCookie.token !== process.env.TOKEN)) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const productResponse = await axios.get("http://localhost:3000/api/products");
  const orderResponse = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderResponse.data,
      products: productResponse.data,
    },
  };
};

export default Index;
