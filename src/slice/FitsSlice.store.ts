import { createSlice } from "@reduxjs/toolkit";
import { UserDetailInfoInterface } from "../interfaces";
import { string } from "yup";

interface CounterState {
  isLoading: boolean;
  userInfo: Partial<UserDetailInfoInterface>;
  createStripeData: any;
}

const initialState: CounterState = {
  isLoading: false,
  userInfo: {},
  createStripeData: {},
};
const fitsSlice = createSlice({
  name: "fits",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setCreateStripeData: (state, action) => {
      state.createStripeData = action.payload;
    },
  },
});

export const { setIsLoading, setUserInfo, setCreateStripeData } = fitsSlice.actions;

export default fitsSlice.reducer;
