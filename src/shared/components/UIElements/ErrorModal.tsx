import React from "react";

import Modal from "./Modal";

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.clearError}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<button onClick={props.clearError}>Okay</button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
