import React, { useState, useEffect, useReducer } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

//debouncing, debounce

const emailReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT1') {
    return {
      ...prevState,
      value1: action.emailValue,
    };
  }
  if (action.type === 'INPUT_BLUR1') {
    return {
      ...prevState,
      isValid: prevState.value1.includes('@'),
    };
  }
  return {
    value1: '',
    isValid: false,
  };
};

const passwordReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT2') {
    return {
      ...prevState,
      value2: action.passwordValue,
    };
  }
  if (action.type === 'INPUT_BLUR2') {
    return {
      ...prevState,
      isValid2: prevState.value2.trim().length > 6,
    };
  }
  return {
    value2: '',
    isValid2: false,
  };
};

const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    isValid: undefined,
    value1: '',
  });

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
      isValid2: undefined,
      value2: '',
  });

  // const [enteredEmail, setEnteredEmail] = useState('text'); // write some email
  // const [emailIsValid, setEmailIsValid] = useState(); // check is email valid or not
  // const [enteredPassword, setEnteredPassword] = useState(''); // write some password
  // const [passwordIsValid, setPasswordIsValid] = useState(); // check is password valid or not
  const [formIsValid, setFormIsValid] = useState(false); // email and password are valid

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailState.value1.includes('@') && passwordState.value2.trim().length > 6);
    }, 3000);
    // clean up function
    return () => {
      clearTimeout(timer);
    };
  }, [emailState.value1, passwordState.value2]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: 'USER_INPUT1', emailValue: event.target.value });
  };
  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: 'USER_INPUT2', passwordValue: event.target.value });
  };
  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({ type: 'INPUT_BLUR1' });
  };
  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: 'INPUT_BLUR2' });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value1,passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value1}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div className={`${classes.control} ${passwordState.isValid2 === false ? classes.invalid : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value2}
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