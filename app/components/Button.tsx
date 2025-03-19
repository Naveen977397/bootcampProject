"use client"
import styles from "../styles/Button.module.css";

interface ButtonProps {
    text?: string;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" |"slotGreenBtn" | 'largeGreenBtn' |'smallcardButtonGreen';
    onClick?: () => void;
  }

  const Button: React.FC<ButtonProps> = ({ text = "Button", variant = "primary" }) => {
    return (
      <button className={`${styles.button} ${styles[variant]}`} onClick={()=>console.log('hello')}>
        {text}
      </button>
    );
  };

export default Button;




// import React from "react";
// import styles from "./Button.module.css";

// interface ButtonProps {
//   text: string;
//   onClick?: () => void;
//   type?: "button" | "submit" | "reset";
//   variant?: "smallGreenBtn" | "smallWhiteBtn" | "largeGreenBtn" | "largeBrownBtn" | "mainPageButton" | "tinyGreenBtn" | "tinyWhiteBtn" | "cardButton" | "cardButtonGreen" | "slotGreenBtn" | "smallcardButtonGreen"; 
//   disabled?: boolean;
// }

// const Button: React.FC<ButtonProps> = ({
//   text,
//   onClick,
//   type = "button",
//   variant = "primary",
//   disabled = false,
// }) => {
//   return (
//     <button
//       className={`${styles.button} ${styles[variant]}`}
//       onClick={onClick}
//       type={type}
//       disabled={disabled}
//     >
//       {text}
//     </button>
//   );
// };

// export default Button;
