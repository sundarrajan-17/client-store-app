import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
