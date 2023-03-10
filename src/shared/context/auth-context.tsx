import React from "react";

// share data across app.
const AuthContext = React.createContext({
  isLoggedIn: "",
  login: () => {},
  logout: () => {},
  token: "",
});

export default AuthContext;
