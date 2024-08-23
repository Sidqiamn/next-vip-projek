import Link from "next/link";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(" ");
  const push = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsLoading(true);
    setError("");
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    try {
      const result = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (result.status === 200) {
        form.reset();
        push.push("/auth/login");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError("email is already register");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.register_error}>Register</h1>
      {isError && <p className={styles.register_error}>{isError}</p>}
      <div className={styles.register_form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.register_form_item}>
            <label htmlFor="fullname">Fullname</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              className={styles.register_form_item_input}
            />
          </div>
          <div className={styles.register_form_item}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className={styles.register_form_item_input}
            />
          </div>
          <div className={styles.register_form_item}>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              className={styles.register_form_item_input}
            />
          </div>
          <div className={styles.register_form_item}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className={styles.register_form_item_input}
            />
          </div>
          <button type="submit" className={styles.register_form_item_button}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p className={styles.register_link}>
        Have an account? Sign in <Link href="/auth/login">Here</Link>
      </p>
    </div>
  );
};

export default RegisterView;
