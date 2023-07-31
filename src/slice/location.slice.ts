import { createSlice } from "@reduxjs/toolkit";

export interface LocationState {
    latitude: number;
    longitute: number;
}

const initialState: LocationState = {
    latitude: 0,
    longitute: 0
};

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setLocationState: (state, action: { payload: LocationState }) => {
            state.latitude = action.payload.latitude;
            state.longitute = action.payload.longitute;
        },
        clearLocationState: (state, action) => {
            state.latitude = action.payload.latitude;
            state.longitute = action.payload.longitute;
        },
    },
});

export const { clearLocationState, setLocationState } = locationSlice.actions;

export default locationSlice.reducer;
