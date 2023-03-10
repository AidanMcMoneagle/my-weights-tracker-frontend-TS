import React, {
  useState,
  useCallback,
  useReducer,
  useEffect,
  useContext,
} from "react";
import { useHistory, Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import UserExercise from "./UserExercise";
import Modal from "../../shared/components/UIElements/Modal";
import useHttpClientCustomHook from "../../shared/hooks/useHttpClientCustomHook";
import AuthContext from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Card from "../../shared/components/UIElements/Card";

import "./UserWorkout.css";

const inputReducer = (state, action) => {
  if (action.type === "EXERCISE_ADDED") {
    return [
      ...state,
      {
        exerciseId: action.payload.id,
        exerciseName: action.payload.name,
        exerciseSets: action.payload.value,
      },
    ];
  }
};

const UserWorkout = (props) => {
  const { userWorkout, deleteHandler, isViewingArchivedWorkouts } = props;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [inTrackingMode, setIsTrackingMode] = useState(false);
  const [numberOfSetHeaders, setNumberOfSetHeaders] = useState([]);

  // if allExercises have been tracked i.e. every set input has been populated we change state to true and allow button to submit data.
  const [areAllExercisesTracked, setAreAllExercisesTracked] = useState(false);

  const [inputState, dispatch] = useReducer(inputReducer, []);

  const { error, isLoading, sendRequest, clearError } =
    useHttpClientCustomHook();

  const auth = useContext(AuthContext);

  const history = useHistory();

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openTrackingMode = () => {
    setIsTrackingMode(!inTrackingMode);
  };

  // every single time the page re renders I want to check if all inputs have been filled. I have to check if the length of the inputState is equal to the number of exercises in the workout.
  useEffect(() => {
    if (inputState && inputState.length !== userWorkout.exercises.length) {
      return;
    } else {
      setAreAllExercisesTracked(true);
    }
  }, [inputState, userWorkout.exercises.length]);

  //function is passed down to UserExercise component. Used to pass number of sets to UserWorkout so we can dynamically change the number of input headers in the table for each workout.
  const passNumberOfSetInputs = useCallback(
    (inputArray) => {
      if (inputArray.length > numberOfSetHeaders.length) {
        setNumberOfSetHeaders(inputArray);
      } else {
        return;
      }
    },
    [numberOfSetHeaders.length]
  );

  const onInput = (id, value, name) => {
    dispatch({
      type: "EXERCISE_ADDED",
      payload: {
        id,
        name,
        value,
      },
    });
  };

  const submitWorkoutTrackingData = async () => {
    console.log(inputState);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/trackworkouts/${userWorkout._id}`,
        "POST",
        JSON.stringify({
          exerciseWeights: inputState,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      console.log(responseData);
      history.push(`/${userWorkout._id}/myprogress`);
    } catch (err) {}
  };

  const { archiveWorkout } = props;

  // send a request to Update Workout.
  const archiveWorkoutHandler = () => {
    return archiveWorkout(userWorkout._id);
  };

  const { unArchiveWorkout } = props;
  const unArchiveWorkoutHandler = () => {
    return unArchiveWorkout(userWorkout._id);
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorModal error={error} clearError={clearError} />}
      {isDeleteModalOpen && (
        <Modal
          show
          header={"WARNING!"}
          footer={
            <div>
              <button onClick={() => deleteHandler(userWorkout._id)}>
                YES
              </button>
              <button onClick={closeDeleteModal}>NO</button>
            </div>
          }
          onCancel={closeDeleteModal}
        >
          <p>
            Are you sure you want to delete this workout? If you delete this
            workout all associated progress will also be deleted.
          </p>
        </Modal>
      )}
      <Card className="workout-data">
        <div className="workout-header">
          <h3>{userWorkout.workoutName.trim()}</h3>
          <div className="workout-header-btns">
            {!isViewingArchivedWorkouts && !inTrackingMode && (
              <button className="archive" onClick={archiveWorkoutHandler}>
                ARCHIVE WORKOUT
              </button>
            )}
            {isViewingArchivedWorkouts && (
              <button className="unarchive" onClick={unArchiveWorkoutHandler}>
                ADD TO ACTIVE WORKOUTS
              </button>
            )}
            <button className="delete-btn" onClick={openDeleteModal}>
              <AiOutlineClose />
            </button>
          </div>
        </div>
        <div className="workout-date">
          <h5>{`Created on: ${new Intl.DateTimeFormat("en-GB").format(
            new Date(userWorkout.date)
          )}`}</h5>
        </div>
        <form className="workout-table-form">
          <table className="workout-table">
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Repetitions</th>
                <th>Sets</th>
                {inTrackingMode &&
                  numberOfSetHeaders.length > 0 &&
                  numberOfSetHeaders.map((input, index) => {
                    return (
                      <th className="track-input" key={index}>{`Set ${
                        index + 1
                      }`}</th>
                    );
                  })}
                {inTrackingMode && numberOfSetHeaders.length > 0 && <th></th>}
              </tr>
            </thead>
            <tbody>
              {userWorkout.exercises.map((exercise) => {
                return (
                  <tr key={exercise._id}>
                    <UserExercise
                      exercise={exercise}
                      inTrackingMode={inTrackingMode}
                      passNumberOfSetInputs={passNumberOfSetInputs}
                      numberOfSetHeaders={numberOfSetHeaders}
                      onInput={onInput}
                    />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
        <div className="btn-container">
          {!isViewingArchivedWorkouts && (
            <button onClick={openTrackingMode}>
              {!inTrackingMode ? "TRACK WORKOUT" : "BACK"}
            </button>
          )}
          {inTrackingMode && (
            <button
              onClick={submitWorkoutTrackingData}
              disabled={!areAllExercisesTracked}
            >
              LOG WORKOUT
            </button>
          )}
          {/* we can only view workout progress if the workoutprogress array is greater than 0 in length */}
          <Link exact to={`/${userWorkout._id}/myprogress`}>
            <button disabled={userWorkout.workoutProgress.length === 0}>
              VIEW PROGRESS
            </button>
          </Link>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default UserWorkout;
