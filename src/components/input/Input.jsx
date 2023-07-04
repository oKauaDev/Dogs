import React from "react";
import styles from "./input.module.css";

const Input = ({
  label,
  type,
  name,
  setValid,
  value,
  setValue,
  displayErro = true,
  ...props
}) => {
  const regexps = {
    email: {
      regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/g,
      message: "Email inválido",
    },
    text: {
      regexp: /[\D0-9]/g,
      message: "Preencha um valor",
    },
    password: {
      regexp: /[\D0-9]/g,
      message: "Preencha uma senha válida",
    },
    number: {
      regexp: /[0-9]/g,
      message: "Preencha um número válido",
    },
  };

  const [erro, setErro] = React.useState(false);

  function handleChange({ target }) {
    setValue(target.value);
    valid(target.value);
  }

  function handleBlur({ target }) {
    setValue(target.value);
    valid(target.value);
  }

  function valid(value) {
    const regexp = regexps[type].regexp;

    if (regexp) {
      const test = regexp.test(value);
      setValid(test);
      if (test) {
        setErro(false);
        return true;
      } else {
        setErro(regexps[type].message);
        return false;
      }
    } else {
      throw new Error("This type of email does not exist, add it manually");
    }
  }

  return (
    <label className={styles.label}>
      {label}
      <input
        className={styles.input}
        type={type}
        name={name}
        id={name}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
      {displayErro && erro && <p className={styles.error}>{erro}</p>}
    </label>
  );
};

export default Input;
