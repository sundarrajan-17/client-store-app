import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: false,
  isOrg: false,
  orgId: "",
  databaseId: "",
  token: "",
  userId: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    sendLogInData: (state, action) => {
      console.log(action);
      state.loginStatus = true;
    },
    setOrgIdUserIdToken: (state, action) => {
      console.log(action);
      state.orgId = action.payload.orgId;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    setOrg: (state) => {
      state.isOrg = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { sendLogInData, setOrgIdUserIdToken, setOrg } = authSlice.actions;

export default authSlice.reducer;
