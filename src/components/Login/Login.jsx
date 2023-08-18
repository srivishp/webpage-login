import React, { useState, useEffect, useReducer } from "react";
// reducer can handle complex/larger states.
// Reducer can be used if two states are closely dependent on each other
// or if we are setting state based on values of other states, instead of previousValues of the same state
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// defining reducer func outside component as it does not require data fropm the component
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    // state returns the last/latest value always
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    // state returns the last/latest value always
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState("");
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // Takes 3 args: const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn)
  // array destructuring same as useState, except we have a func to dispatch an action, not to set state value
  // initialState and initFn are optional
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    console.log("EFFECT_RUNNING");

    return () => {
      console.log("EFFECT_CLEANUP");
    };
  }, []);

  // object destructuring, to make code cleaner in useEffect
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  // useEffect to detect change of email and password once
  // and not for every keystroke. Avoids duplication of code too
  useEffect(() => {
    // setting timeout to capture input with delay
    // used to store data and check later for validity (for example, of an email)
    // setTimeout is built in. Delay is 500ms
    const identifier = setTimeout(() => {
      console.log("Check form validity");

      // validation is done in reducer now
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    //cleanup function: runs before every new execution of side effects function
    // except before the first side effect execution
    return () => {
      console.log("Cleanup");
      // cleanup can be used to avoid sending dozens of API requests to a server, just cuz the keystrokes were detected
      // cleanup unmounts stuff from the DOM
      clearTimeout(identifier);
    };
    // Now useEffect will run only if validity changes, but notevery time the value also changes
    // Which means optimized code by avoiding unnecessary effect execution
    // TODO: Always pass specific properties instead of the entire object as a dependency.
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // type indiactes type action that is being dispatched
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(emailState.value.includes("@") && passwordState.isValid);
    // console.log(emailState.value);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
    // console.log(passwordState.value);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
