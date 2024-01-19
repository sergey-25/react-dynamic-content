import React from "react";
import InputMask from "react-input-mask";
import "react-phone-number-input/style.css";

const ContactTextField = ({ type, value, onChange }) => {
  const getMask = () => {
    // Define the mask based on the type
    if (type === "phone") {
      return "+380 (99) 999-99-99";
    }

    return "";
  };

  return (
    <>
      {type === "phone" ? (
        <>
          <InputMask
            className="textfield"
            mask={getMask()}
            maskChar="_" // Placeholder character for the mask
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </>
      ) : (
        <>
          <input
            className="textfield"
            type="email"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </>
      )}
    </>
  );
};

export default ContactTextField;
