import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMyProfile } from "../../features/UI/uiSlice";
import { clearUserProfile } from "../../features/UserProfile/userProfileSlice";

let logoutTimer;

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const dispatch = useDispatch();

  // login with uid, token, expiration date.
  // create an expiration date. If no expiration date is passed in then we know user has just logged in.
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    // created a Date Object with current date in milliseconds from 1970 plus 1 hour.
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      // can only store text in localstorage (not objects) why we must convert JS object to JSON string.
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    dispatch(closeMyProfile());
    dispatch(clearUserProfile());
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    setIsCheckingAuth(false);
  }, []);

  // on page reload we check if token data in localstorage. if there is token Data and the expiration date (Milliseconds) is greater than the current time in milliseconds then we log in, using the userId, token and expiration date of the token.
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login, logout]);

  // logs user out automatically if the token expires.
  // Should re run whenever the token changes i.e. user is logged in/logged out and when tokenExpiration date changes(user logged in).
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      // clearTimeOut when user logs out. Useffect will re run when token changes.
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return { login, logout, token, isCheckingAuth };
};

export default useAuth;
