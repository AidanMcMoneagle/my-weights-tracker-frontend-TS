import React, { useRef, useState, useEffect } from "react";

import "./ImageUpload.css";

const ImageUpload = (props) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState(null);

  const pickImageHandler = () => {
    filePickerRef.current.click(); //.click method simulates a mouse click on a DOM element. Default behaviour when we click on an input with type='file' that it will open the filepicker.
  };

  // should execute on first render and whenever the file changes. When the file changes we will want to set the previewImage.

  const { passPreviewImage } = props;
  useEffect(() => {
    if (!file) {
      return;
    }
    // FileReader object lets web applications asynchronously read contents of files stored on the users computer. File objects may be obtained from a fileslist object returned returned as result of a user selecting files using the <input> element.
    const fileReader = new FileReader();
    fileReader.onload = () => {
      passPreviewImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file, passPreviewImage]);

  const pickedHandler = (e) => {
    e.preventDefault();
    let pickedFile;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
    }
    props.onInput(pickedFile); // call a function to pass data to the parent component that will use the pickedFile.
  };

  return (
    <div className="form-control">
      <input
        type="file"
        style={{ display: "none" }} // set display to none as the filePicker by default is ugly. we simulate a click on the file picker using the pickImageHandler function.
        accept=".jpg, .png, .jpeg, .PNG"
        ref={filePickerRef}
        onChange={pickedHandler} // when we pick a file the onChange function will run.
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <button onClick={pickImageHandler} className="pick-img-btn">
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
