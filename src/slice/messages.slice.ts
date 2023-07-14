import { createSlice } from "@reduxjs/toolkit";

export interface MessageState {
  unReadMessages: boolean;
}

const initialState: MessageState = { unReadMessages: false };

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setUnReadMessage: (state) => {
      state.unReadMessages = true;
    },
    clearUnReadMessages: (state) => {
      state.unReadMessages = false;
    },
  },
});

export const { setUnReadMessage, clearUnReadMessages } = messageSlice.actions;

export default messageSlice.reducer;
