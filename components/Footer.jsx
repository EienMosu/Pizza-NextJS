import Image from "next/image";
import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" alt="" layout="fill" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            OH YES, WE DID. THE OZKAN'S PIZZA, WELL BAKED SLICE OF PIZZA.
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>

          <p className={styles.text}>
            1254 B. Mc Road #304.
            <br /> NewYork, 82132
            <br /> (212) 231-2567
          </p>
          <p className={styles.text}>
            8643 D. Snooop CK #534.
            <br /> NewYork, 98732
            <br /> (565) 653-9056
          </p>
          <p className={styles.text}>
            9032 M. Axie OK #304.
            <br /> NewYork, 05674
            <br /> (978) 763-4312
          </p>
          <p className={styles.text}>
            8903 Z. Elwin ES #304.
            <br /> NewYork, 09671
            <br /> (295) 986-5423
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 9.00 - 23.00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 12.00 - 20.00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
