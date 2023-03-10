import React, {
  useState,
  useReducer,
  useCallback,
  useContext,
  useEffect,
} from "react";

import { useDispatch } from "react-redux";
import {
  setUserEmail,
  setUserImage,
  setUserName,
} from "../../features/UserProfile/userProfileSlice";

import { useHistory, Link } from "react-router-dom";

import useHttpClientCustomHook from "../../shared/hooks/useHttpClientCustomHook";
import AuthContext from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import ConfirmPasswordInput from "../../shared/components/FormElements/ConfirmPasswordInput";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../shared/utils/validators";

import "./Auth.css";

const formReducer = (state, action) => {
  if (action.type === "INPUT_CHANGE") {
    let isValidForm = true;
    for (const [key, value] of Object.entries(state.inputs)) {
      if (key.toString() === action.payload.id) {
        continue;
      }
      if (!value.isValid) {
        isValidForm = false;
      }
    }

    return {
      ...state,
      inputs: {
        ...state.inputs,
        [action.payload.id]: {
          value: action.payload.value,
          isValid: action.payload.isValid,
        },
      },
      formIsValid: isValidForm && action.payload.isValid ? true : false,
    };
  }
  if (action.type === "ADD_NAME_FIELD") {
    return {
      ...state,
      inputs: {
        ...state.inputs,
        name: {
          value: "",
          isValid: false,
        },
      },
      formIsValid: false,
    };
  }
  if (action.type === "REMOVE_NAME_FIELD") {
    return {
      ...state,
      inputs: {
        email: {
          value: state.inputs.email.value,
          isValid: state.inputs.email.isValid,
        },
        password: {
          value: state.inputs.password.value,
          isValid: state.inputs.password.isValid,
        },
      },
      formIsValid: state.inputs.password.isValid && state.inputs.email.isValid,
    };
  }
};

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    formIsValid: false,
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordValid, setConfirmPasswordValid] = useState(false);

  const { error, isLoading, sendRequest, clearError } =
    useHttpClientCustomHook();

  const auth = useContext(AuthContext);

  const history = useHistory();

  const dispatchRedux = useDispatch();

  const toggleLoginMode = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      dispatch({
        type: "ADD_NAME_FIELD",
      });
    } else {
      dispatch({
        type: "REMOVE_NAME_FIELD",
      });
    }
    setIsLoginMode(!isLoginMode);
  };

  // we pass inputChangeHandler into the dependency array of useEffect() in the Input element. We must therefore wrap in useCallback.
  const inputChangeHandler = useCallback((id, value, isValid) => {
    if (id !== "confirmpassword")
      dispatch({
        type: "INPUT_CHANGE",
        payload: {
          id,
          value,
          isValid,
        },
      });
    else {
      setConfirmPassword(value);
    }
  }, []);

  useEffect(() => {
    if (
      formState.inputs.password.isValid &&
      formState.inputs.password.value === confirmPassword
    ) {
      setConfirmPasswordValid(true);
    } else {
      setConfirmPasswordValid(false);
    }
  }, [formState.inputs.password, confirmPassword]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );

        const { userId, token, userEmail, userName, userImage } = responseData;
        auth.login(userId, token);

        // need to also set the user details. We should do this in redux. Dispatch some actions to the store.
        dispatchRedux(setUserEmail(userEmail));
        dispatchRedux(setUserName(userName));
        dispatchRedux(setUserImage(userImage));

        history.push("/myworkouts"); // redirect to myworkouts page once we have logged in
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );

        const { userId, token, userEmail, userName } = responseData;
        auth.login(userId, token);
        dispatchRedux(setUserEmail(userEmail));
        dispatchRedux(setUserName(userName));

        history.push("/myworkouts");
      } catch (e) {}
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorModal error={error} clearError={clearError} />}
      <Card className="authentication">
        <h3>{isLoginMode ? "Login Required" : "Sign up Required"}</h3>
        <form onSubmit={onSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              type="text"
              labelText="Your Name"
              errorText="please enter your name"
              onInput={inputChangeHandler}
              validators={[VALIDATOR_REQUIRE()]}
            />
          )}
          <Input
            id="email"
            type="email"
            labelText="Email"
            errorText="please enter a valid email"
            onInput={inputChangeHandler}
            validators={[VALIDATOR_EMAIL()]}
          />
          <Input
            id="password"
            type="password"
            labelText="Password"
            errorText="please enter a password with a min length 8 characters"
            onInput={inputChangeHandler}
            validators={[VALIDATOR_MINLENGTH(8)]}
          />
          <div>
            {isLoginMode && (
              <Link exact to={"/forgotpassword"}>
                Forgot Password?
              </Link>
            )}
          </div>
          {!isLoginMode && (
            <ConfirmPasswordInput
              isConfirmPasswordValid={isConfirmPasswordValid}
              onInput={inputChangeHandler}
              labelText="Confirm Password"
            />
          )}
          <div>
            {isLoginMode && (
              <button disabled={!formState.formIsValid}>LOGIN</button>
            )}
            {!isLoginMode && (
              <button
                disabled={!formState.formIsValid || !isConfirmPasswordValid}
              >
                SIGN UP
              </button>
            )}
          </div>
          <div>
            <button onClick={toggleLoginMode}>
              {isLoginMode ? "SWITCH TO SIGN UP" : "SWITCH TO LOGIN"}
            </button>
          </div>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
