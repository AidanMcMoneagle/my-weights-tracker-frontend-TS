import React, { useState, useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { closeMyProfile } from "../../../features/UI/uiSlice";
import { setUserImage } from "../../../features/UserProfile/userProfileSlice";

import useHttpClientCustomHook from "../../hooks/useHttpClientCustomHook";
import AuthContext from "../../context/auth-context";
import Avatar from "./Avatar";
import LoadingSpinner from "./LoadingSpinner";
import ErrorModal from "./ErrorModal";
import Modal from "./Modal";
import ImageUpload from "../FormElements/ImageUpload";

import "./MyProfile.css";

// NEED TO HAVE ACCESS TO USER DETAILS IN REDUX STORE

const MyProfile = () => {
  const [previewUrl, setPreviewUrl] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const auth = useContext(AuthContext);

  const dispatch = useDispatch();

  const userImage = useSelector((state) => state.userProfile.userImage);
  const userName = useSelector((state) => state.userProfile.userName);
  const userEmail = useSelector((state) => state.userProfile.userEmail);

  const { error, isLoading, sendRequest, clearError } =
    useHttpClientCustomHook();

  const inputHandler = (pickedFile) => {
    console.log(pickedFile);
    setImage(pickedFile);
  };

  const passPreviewImage = useCallback((previewUrl) => {
    setPreviewUrl(previewUrl);
  }, []);

  const closeMyProfileModal = () => {
    dispatch(closeMyProfile());
  };

  // want to upload the image. Once complete we want to add the image to our redux store and then also close the My profile modal.
  const submitFormHandler = async () => {
    if (!image) {
      return;
    }
    try {
      let formData = new FormData();
      formData.append("image", image);
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/updateprofile`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      // want to close the modal but also want to update the image.
      dispatch(setUserImage(responseData.image));
      closeMyProfileModal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorModal error={error} clearError={clearError} />}
      <Modal
        show
        header={"MY PROFILE"}
        footer={
          <div>
            <button onClick={submitFormHandler} disabled={!image}>
              UPDATE PROFILE
            </button>
            <button>
              <Link to="/login" onClick={auth.logout} className="logout-link">
                LOGOUT
              </Link>
            </button>
          </div>
        }
        footerClass={"myprofile-footer"}
        onCancel={closeMyProfileModal}
      >
        <div>
          <div className="profile-image-container">
            {!previewUrl && (
              <Avatar
                image={userImage}
                alt="https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Image.png"
                className="profile-image-dropdown"
              />
            )}
            {previewUrl && (
              <Avatar image={previewUrl} className="profile-image-dropdown" />
            )}
            <ImageUpload
              id="image"
              onInput={inputHandler}
              passPreviewImage={passPreviewImage}
              buttonText={image || userImage ? "UPDATE IMAGE" : "ADD IMAGE"}
            />
          </div>
          <h4>Name: {userName} </h4>
          <h4>Email: {userEmail}</h4>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default MyProfile;
