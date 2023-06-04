import {createSlice} from '@reduxjs/toolkit';

interface CounterState {
  isLoading: boolean;
  userInfo: object;
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

export const {setIsLoading, setUserInfo} = fitsSlice.actions;

export default fitsSlice.reducer;
