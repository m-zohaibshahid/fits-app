import { createSlice } from '@reduxjs/toolkit';
import { UserDetailInfoInterface } from '../interfaces';

interface CounterState {
  isLoading: boolean;
  userInfo: Partial<UserDetailInfoInterface>
  ;
}

const initialState: CounterState = {
  isLoading: false,
  userInfo: {},
};
const fitsSlice = createSlice({
  name: 'fits',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setIsLoading, setUserInfo } = fitsSlice.actions;

export default fitsSlice.reducer;
