import Head from "next/head";
import Image from "next/image";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList";
import styles from "../styles/Home.module.css";
import axios from "axios";

const Home = ({ productList }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <ProductList productList={productList} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const response = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      productList: response.data,
    },
  };
};

export default Home;
