import React from "react";
import styles from "../styles/ProductList.module.css";
import PizzaCard from "./PizzaCard";

const ProductList = ({ productList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A cupiditate
        fuga cumque atque error enim natus temporibus commodi repellendus,
        corrupti iste maxime dolorum vitae accusantium. Esse eos cum ab
        voluptatem.
      </p>
      <div className={styles.wrapper}>
        {productList.map((product) => (
          <PizzaCard
            key={product._id}
            id={product._id}
            img={product.img}
            title={product.title}
            price={product.prices[0]}
            desc={product.desc}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
