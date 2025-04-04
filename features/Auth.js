import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: false,
  isOrg: false,
  orgId: "",
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    getLoginStatus: (state) => {
      return state.loginStatus;
    },
    sendLogInData: (state, action) => {
      console.log(action);
      state.loginStatus = true;
    },
    setOrgIdAndToken: (state, action) => {
      console.log(action);
      state.orgId = action.payload.orgId;
      state.token = action.payload.token;
    },
    setOrg: (state) => {
      state.isOrg = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getLoginStatus, sendLogInData, setOrgIdAndToken, setOrg } =
  authSlice.actions;

export default authSlice.reducer;
