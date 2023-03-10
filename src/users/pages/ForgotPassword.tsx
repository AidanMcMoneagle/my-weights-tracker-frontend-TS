import React, { useState, useCallback } from "react";

import useHttpClientCustomHook from "../../shared/hooks/useHttpClientCustomHook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_EMAIL } from "../../shared/utils/validators";

import "./Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState(undefined);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { error, isLoading, sendRequest, clearError } =
    useHttpClientCustomHook();

  const inputChangeHandler = useCallback((id, value, isValid) => {
    setEmail(value);
    setIsEmailValid(isValid);
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(email);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/forgotpassword`,
        "POST",
        JSON.stringify({
          email: email,
        }),
        { "Content-Type": "application/json" }
      );
      setIsEmailSent(true);
    } catch (err) {
      console.log("error");
    }
  };
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorModal error={error} clearError={clearError} />}
      <Card className="authentication">
        <h3>Forgot Password</h3>
        {!isEmailSent && (
          <React.Fragment>
            <p>
              Please enter the email address you registered your account with.
              We will send you the reset password confirmation to this email
            </p>
            <form onSubmit={onSubmitHandler}>
              <Input
                id="forgotpassword"
                type="email"
                labelText="Email"
                onInput={inputChangeHandler}
                errorText="please enter a valid email"
                validators={[VALIDATOR_EMAIL()]}
              />
              <div>
                <button disabled={!isEmailValid}>SEND EMAIL</button>
              </div>
            </form>
          </React.Fragment>
        )}
        {isEmailSent && (
          <p>{`A password reset link has been sent to ${email}`}.</p>
        )}
      </Card>
    </React.Fragment>
  );
};

export default ForgotPassword;
