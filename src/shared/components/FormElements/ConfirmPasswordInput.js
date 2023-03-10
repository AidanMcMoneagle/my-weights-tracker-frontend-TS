import React, { useState, useEffect } from "react";

const ConfirmPasswordInput = (props) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const { isConfirmPasswordValid, onInput } = props;

  const changeHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const touchHandler = (e) => {
    setConfirmPasswordTouched(true);
  };

  useEffect(() => {
    onInput("confirmpassword", confirmPassword);
  }, [confirmPassword, onInput]);

  return (
    <div
      className={`form-control ${
        !isConfirmPasswordValid &&
        isConfirmPasswordTouched &&
        "form-control--invalid"
      }`}
    >
      <label htmlFor="confirmpassword">{props.labelText}</label>
      <input
        type="password"
        id="confirmpassword"
        onChange={changeHandler}
        onBlur={touchHandler} //onBlur event occurs when user loses focus on element.
        value={confirmPassword}
      />
      {!isConfirmPasswordValid && isConfirmPasswordTouched && (
        <p>passwords do not match</p>
      )}
    </div>
  );
};

export default ConfirmPasswordInput;
