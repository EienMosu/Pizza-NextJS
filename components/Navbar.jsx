import React from "react";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>012 345 6789</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/">
            <li className={styles.listItem} style={{ cursor: "pointer" }}>
              Homepage
            </li>
          </Link>
          <Link href="/">
            <h1 className={styles.logo}>Ozkan's Pizza</h1>
          </Link>
          <Link href="/admin">
            <li className={styles.listItem} style={{ cursor: "pointer" }}>
              Admin-Dashboard
            </li>
          </Link>
        </ul>
      </div>
      <div className={styles.item}>
        <Link href="/cart">
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            {quantity !== 0 && <div className={styles.counter}>{quantity}</div>}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
