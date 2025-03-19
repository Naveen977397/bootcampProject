"use client"
import React, { useState } from "react"; 
import styles from "../styles/Input.module.css";

interface InputProps {
  label?: string;
  placeholder?: string;
  text?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ label, placeholder, text, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {/* Left-side Icon (e.g., Lock Icon) */}
        {text && (
          <span className={styles.icon}>
            <img src={text} alt="icon" />
          </span>
        )}

        {/* Input Field */}
        <input type={inputType} placeholder={placeholder} className={styles.inputField} />

        {/* Password Toggle Icon (With Opacity Change) */}
        {type === "password" && (
          <img 
            src="./Eye.svg" 
            className={showPassword ? styles.toggleHidden : styles.toggleVisible} 
            onClick={() => setShowPassword(!showPassword)}
            alt="Toggle password visibility"
          />
        )}
      </div>
    </div>
  );
};

export default Input;
