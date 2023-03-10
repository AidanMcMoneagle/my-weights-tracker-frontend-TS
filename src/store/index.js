import { configureStore } from "@reduxjs/toolkit";

import UIReducer from "../features/UI/uiSlice";
import UserProfileReducer from "../features/UserProfile/userProfileSlice";

const store = configureStore({
  reducer: { ui: UIReducer, userProfile: UserProfileReducer },
});

export default store;
