import React, { useEffect, useContext, useState } from "react";

import useHttpClientCustomHook from "../../shared/hooks/useHttpClientCustomHook";
import AuthContext from "../../shared/context/auth-context";
import UserWorkoutList from "../components/UserWorkoutList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import "./MyWorkout.css";

const MyWorkouts = () => {
  const { error, isLoading, sendRequest, clearError } =
    useHttpClientCustomHook();

  const [userWorkouts, setUserWorkouts] = useState(undefined);

  const [isViewingArchivedWorkouts, setIsViewingArchivedWorkouts] =
    useState(false);

  const auth = useContext(AuthContext);

  const deleteWorkoutHandler = async (workoutId) => {
    console.log(workoutId);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/workouts/${workoutId}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      const newUserWorkoutArray = userWorkouts.filter((workout) => {
        return workoutId !== workout._id;
      });
      setUserWorkouts(newUserWorkoutArray);
    } catch (err) {}
  };

  const archiveWorkout = async (workoutId) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/workouts/archive/${workoutId}`,
        "PUT",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      const newUserWorkoutArray = userWorkouts.filter((workout) => {
        return workoutId !== workout._id;
      });
      setUserWorkouts(newUserWorkoutArray);
    } catch (e) {}
  };

  const unArchiveWorkout = async (workoutId) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/workouts/unarchive/${workoutId}`,
        "PUT",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      const newUserWorkoutArray = userWorkouts.filter((workout) => {
        return workoutId !== workout._id;
      });
      setUserWorkouts(newUserWorkoutArray);
    } catch (e) {}
  };

  const viewActiveWorkouts = () => {
    setUserWorkouts(undefined);
    setIsViewingArchivedWorkouts(false);
  };

  const viewArchivedWorkouts = () => {
    setUserWorkouts(undefined);
    setIsViewingArchivedWorkouts(true);
  };

  // We load
  useEffect(() => {
    const fetchMyWorkouts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/workouts/`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        setUserWorkouts([...responseData.foundWorkouts]);
       
      } catch (e) {
        console.log(e);
      }
    };

    fetchMyWorkouts();
  }, [auth.token, sendRequest, isViewingArchivedWorkouts]);

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorModal error={error} clearError={clearError} />}
      <div className="navigation-btn-container">
        <h2>{"Navigate to:"}</h2>
        <div className="navigation-btns">
          <button
            className={
              isViewingArchivedWorkouts ? "not-active-page" : "active-page"
            }
            onClick={viewActiveWorkouts}
          >
            ACTIVE WORKOUTS
          </button>
          <button
            className={
              isViewingArchivedWorkouts ? "active-page" : "not-active-page"
            }
            onClick={viewArchivedWorkouts}
          >
            ARCHIVED WORKOUTS
          </button>
        </div>
      </div>

      {userWorkouts && (
        <UserWorkoutList
          userWorkouts={userWorkouts}
          deleteHandler={deleteWorkoutHandler}
          archiveWorkout={archiveWorkout}
          unArchiveWorkout={unArchiveWorkout}
          isViewingArchivedWorkouts={isViewingArchivedWorkouts}
        />
      )}
    </React.Fragment>
  );
};

export default MyWorkouts;
