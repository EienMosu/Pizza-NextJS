import Head from "next/head";
import Image from "next/image";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList";
import styles from "../styles/Home.module.css";
import axios from "axios";
import AddButton from "../components/AddButton";
import { useState } from "react";
import AddPizzaButton from "../components/AddPizzaButton";

const Home = ({ productList, admin }) => {
  const [addPizza, setAddPizza] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setAddPizza={setAddPizza} />}
      {addPizza && <AddPizzaButton setAddPizza={setAddPizza} />}
      <ProductList productList={productList} />
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const response = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      productList: response.data,
      admin,
    },
  };
};

export default Home;
