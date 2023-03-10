import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { useSelector } from "react-redux";

import NewWorkout from "./workouts/pages/NewWorkout";
import MyWorkouts from "./workouts/pages/MyWorkouts";
import MyProgress from "./workouts/pages/MyProgress";
import AuthContext from "./shared/context/auth-context";
import Auth from "./users/pages/Auth";
import ForgotPassword from "./users/pages/ForgotPassword";
import ResetPassword from "./users/pages/ResetPassword";
import useAuth from "./shared/hooks/useAuth";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import MyProfile from "./shared/components/UIElements/MyProfile";

function App() {
  const { login, logout, token, isCheckingAuth } = useAuth();

  // listens to changes in value of
  const myProfileOpen = useSelector((state) => state.ui.isMyProfileOpen);

  let routes;
  if (!token) {
    routes = (
      <Switch>
        <Route exact path="/login">
          <Auth />
        </Route>
        <Route exact path="/forgotpassword">
          <ForgotPassword />
        </Route>
        <Route exact path="/passwordreset/:resetToken">
          <ResetPassword />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  } else {
    routes = (
      <React.Fragment>
        {myProfileOpen && <MyProfile />}
        <Switch>
          <Route exact path="/myworkouts">
            <MyWorkouts />
          </Route>
          <Route exact path="/workouts/new">
            <NewWorkout />
          </Route>
          <Route exact path="/:workoutId/myprogress">
            <MyProgress />
          </Route>
          <Redirect to="/myworkouts" />
        </Switch>
      </React.Fragment>
    );
  }

  // need this if check as we do not want to try and render routes on page refresh. A request will be made to the backend without a token which will throw an error.
  if (isCheckingAuth) {
    return (
      <React.Fragment>
        <Router>
          <MainNavigation />
          <LoadingSpinner />
        </Router>
      </React.Fragment>
    );
  } else {
    return (
      <AuthContext.Provider
        value={{ isLoggedIn: !!token, login, logout, token }}
      >
        <Router>
          <MainNavigation />
          <main>{routes}</main>
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
