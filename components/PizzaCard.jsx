import Image from "next/image";
import React from "react";
import styles from "../styles/PizzaCard.module.css";
import Link from "next/link";

const PizzaCard = ({ img, title, price, desc, id }) => {
  return (
    <div className={styles.container}>
      <Link href={`product/${id}`}>
        <Image src={img} alt="" width="500" height="500" />
      </Link>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{desc}</p>
    </div>
  );
};

export default PizzaCard;
