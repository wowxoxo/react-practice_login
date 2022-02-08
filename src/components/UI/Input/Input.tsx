import React, { useImperativeHandle, useRef } from "react";
import classes from "./Input.module.css";

interface InputProps {
  isValid: boolean | null;
  value: string;
  label: string;
  id: string;
  type?: "date" | "text" | "password" | "email" | "number";
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ isValid, value, label, id, type = "text", onChange, onBlur }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const activate = () => {
      inputRef.current?.focus();
    };

    // interface T1 extends Partial<HTMLInputElement> {
    //   focus: () => void
    // }

    // TODO
    useImperativeHandle(ref, (): any => {
      return { focus: activate };
    });

    return (
      <div
        className={`${classes.control} ${
          isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor={id}>{label}</label>
        <input
          ref={inputRef}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    );
  }
);

export default Input;
