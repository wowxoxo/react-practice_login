import React, { useState, useEffect, useReducer, FC, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

interface inputState {
  value: string;
  isValid: null | boolean;
}
enum inputActionKind {
  USER_INPUT = "USER_INPUT",
  INPUT_BLUR = "INPUT_BLUR"
}

interface inputAction {
  type: inputActionKind;
  val?: string;
}

interface passwordAction {
  type: inputActionKind;
  val: string | null;
}

const emailReducer = (state: inputState, action: inputAction): inputState => {
  if (action.type === "USER_INPUT") {
    console.log(action.val);
    return {
      value: action.val ? action.val : "",
      isValid: action.val ? action.val.includes("@") : false
    };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (
  state: inputState,
  action: passwordAction
): inputState => {
  if (action.type === "USER_INPUT" && action.val !== null) {
    // console.log(action.value)
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if (action.type === "INPUT_BLUR") {
    console.log(state.value);
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  // console.log("work")
  return { value: "", isValid: false };
};

interface LoginProps {
  onLogin?: (email: string, password: string) => void;
}

const initValue = { value: "", isValid: null };

const Login: FC<LoginProps> = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, initValue);

  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    initValue
  );

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      if (emailIsValid !== null && passwordIsValid !== null) {
        setFormIsValid(emailIsValid && passwordIsValid);
      }
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({
      type: inputActionKind.USER_INPUT,
      val: event.target.value
    });

    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // setEnteredPassword(event.target.value);
    // setPasswordIsValid(event.target.value.trim().length > 6);
    dispatchPassword({
      type: inputActionKind.USER_INPUT,
      val: event.target.value
    });

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    console.log("BLUR");
    dispatchEmail({ type: inputActionKind.INPUT_BLUR });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    console.log("BLUR_password");
    dispatchPassword({ type: inputActionKind.INPUT_BLUR, val: null });
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // console.log("val", emailInputRef.current?.value);
    if (formIsValid) {
      props.onLogin && props.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current?.focus();
    } else if (!passwordIsValid) {
      passwordInputRef.current?.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          isValid={emailState.isValid}
          id="email"
          label="E-Mail"
          type="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          isValid={passwordState.isValid}
          id="password"
          label="Password"
          type="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabledy={!formIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
