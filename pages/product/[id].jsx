import React, { useState } from "react";
// NextJS
import Image from "next/image";
// CSS
import styles from "../../styles/Product.module.css";
// Axios
import axios from "axios";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/cartRedux";

const Product = ({ pizza }) => {
  const dispatch = useDispatch();

  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(false);

  const state = useSelector((state) => state.cart);

  const handleQuanitity = (event) => {
    setQuantity(event.target.value);
  };

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];

    setSize(sizeIndex);

    changePrice(difference);
  };

  const handleChange = (event, option) => {
    const checked = event.target.checked;

    if (checked) {
      changePrice(option.price);

      setExtras((prev) => [...prev, option]);

      //or
      // setExtras([...extras, option]);

      // Another way of the add
      // !extras.includes(option) && extras.push(option);
    } else {
      changePrice(-option.price);

      setExtras(extras.filter((extra) => extra._id !== option._id));

      // Another way of the remove
      // const index = extras.indexOf(option);
      // if (index > -1) {
      //   extras.splice(index, 1);
      // }
    }
  };

  const handleSubmit = () => {
    const payload = {
      name: pizza.title,
      img: pizza.img,
      choosenSize: size,
      extrasChoose: extras,
      price: price,
      productTotal: price * quantity,
      quantity,
    };

    dispatch(addProduct(payload));
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

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
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" alt="" layout="fill" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" alt="" layout="fill" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" alt="" layout="fill" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additinional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions?.map((options) => (
            <div className={styles.option} key={options._id}>
              <input
                type="checkbox"
                id={options.text}
                name={options.text}
                className={styles.checkbox}
                onChange={(event) => handleChange(event, options)}
              />
              <label htmlFor="double">{options.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            type="number"
            className={styles.quantity}
            defaultValue="1"
            min="1"
            max="10"
            pattern="[1-9]"
            onChange={(event) => handleQuanitity(event)}
          />
          <button onClick={() => handleSubmit()} className={styles.button}>
            Add to Cart
          </button>
        </div>
        {success && (
          <span style={{ color: "red", fontSize: "14px" }}>
            Your Order is Successfully Added!
          </span>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const response = await axios.get(
    `${window.location.origin}/api/products/${params.id}`
  );
  return {
    props: {
      pizza: response.data,
    },
  };
};

export default Product;
