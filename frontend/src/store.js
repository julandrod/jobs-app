import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import themeReducer from "./features/themeSlice";
import userReducer from "./features/userSlice";
import jobReducer from "./features/jobsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    user: userReducer,
    job: jobReducer,
  },
});
