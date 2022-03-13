import styles from "../../styles/Login.module.css";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    const data = {
      username,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        data
      );

      console.log(response);
      setError(false);
      router.push("/admin");
    } catch (err) {
      console.log(err);
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <div className={styles.item}>
          <label className={styles.label}>Username</label>
          <input
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            placeholder="username: admin"
            className={styles.input}
            type="text"
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Password</label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            placeholder="password: 123456"
            className={styles.input}
            type="text"
          />
        </div>
        <button onClick={() => handleSubmit()} className={styles.button}>
          Sign In
        </button>
        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </div>
    </div>
  );
};

export default Login;
