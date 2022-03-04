import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Product.module.css";
import axios from "axios";

const Product = ({ pizza }) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[size]);
  const [add, setAdd] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleExtraPrice = (event, index) => {
    console.log(pizza.extraOptions[index]?.text)

    if (event.target.checked) {
      pizza.extraOptions[index]?.text === event.target.name &&
        setAdd(pizza.extraOptions?.price);
    } else if(!event.target.checkbox) {
      return console.log("Dsadsa")
    }
  };

  useEffect(() => {
    const finalPrice = quantity * pizza.prices[size];

    setPrice(finalPrice);
  }, [quantity]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} alt="" layout="fill" objectFit="contain" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => setSize(0)}>
            <Image src="/img/size.png" alt="" layout="fill" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => setSize(1)}>
            <Image src="/img/size.png" alt="" layout="fill" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => setSize(2)}>
            <Image src="/img/size.png" alt="" layout="fill" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additinional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions?.map((options, index) => (
            <div className={styles.option} key={options._id}>
              <input
                type="checkbox"
                id={options.text}
                name={options.text}
                className={styles.checkbox}
                onClick={(event) => handleExtraPrice(event, index)}
              />
              <label htmlFor="double">{options.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            className={styles.quantity}
          />
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;

export const getServerSideProps = async ({ params }) => {
  const response = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  return {
    props: {
      pizza: response.data,
    },
  };
};
