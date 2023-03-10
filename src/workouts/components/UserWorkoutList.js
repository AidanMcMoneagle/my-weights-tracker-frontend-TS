import React, { useState, useEffect } from "react";

import UserWorkout from "./UserWorkout";
import Card from "../../shared/components/UIElements/Card";
import { Link } from "react-router-dom";

import "./UserWorkoutList.css";

const UserWorkoutList = (props) => {
  const userWorkoutsArray = props.userWorkouts; //userWorkoutsArray is an array of objects. each object represents a workout.
  const { isViewingArchivedWorkouts } = props;

  const [activeWorkouts, setActiveWorkouts] = useState();
  const [archivedWorkouts, setArchivedWorkouts] = useState();

  useEffect(() => {
    if (!isViewingArchivedWorkouts) {
      const activeUserWorkouts = userWorkoutsArray.filter((workout) => {
        return workout.isArchived === false;
      });
      setActiveWorkouts(activeUserWorkouts);
    } else {
      const archivedUserWorkouts = userWorkoutsArray.filter((workout) => {
        return workout.isArchived === true;
      });
      setArchivedWorkouts(archivedUserWorkouts);
    }
  }, [isViewingArchivedWorkouts, userWorkoutsArray]);

  return (
    <React.Fragment>
      {activeWorkouts &&
        activeWorkouts.length === 0 &&
        !isViewingArchivedWorkouts && (
          <Card className="no-workout-message btn-container">
            <p>
              You currently have no active workouts. To view active workouts
              please create one.
            </p>
            <button className="add-workout-btn">
              <Link to="/workouts/new">ADD WORKOUT</Link>
            </button>
          </Card>
        )}
      {archivedWorkouts &&
        archivedWorkouts.length === 0 &&
        isViewingArchivedWorkouts && (
          <Card className="no-archived-workout-message">
            <p className="center">You currently have no archived workouts.</p>
          </Card>
        )}
      <div className="user-workout-list">
        {!isViewingArchivedWorkouts &&
          activeWorkouts &&
          activeWorkouts.map((workout) => {
            return (
              <UserWorkout
                key={workout._id}
                userWorkout={workout}
                deleteHandler={props.deleteHandler}
                archiveWorkout={props.archiveWorkout}
                isViewingArchivedWorkouts={false}
              />
            );
          })}
        {isViewingArchivedWorkouts &&
          archivedWorkouts &&
          archivedWorkouts.map((workout) => {
            return (
              <UserWorkout
                key={workout._id}
                userWorkout={workout}
                deleteHandler={props.deleteHandler}
                isViewingArchivedWorkouts={true}
                unArchiveWorkout={props.unArchiveWorkout}
              />
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default UserWorkoutList;
