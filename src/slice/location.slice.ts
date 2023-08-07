import { createSlice } from "@reduxjs/toolkit";

export interface LocationState {
    latitude: number;
    longitude: number;
}

const initialState: LocationState = {
    latitude: 0,
    longitude: 0
};

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setLocationState: (state, action: { payload: LocationState }) => {
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;
        },
        clearLocationState: (state, action) => {
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;
        },
    },
});

export const { clearLocationState, setLocationState } = locationSlice.actions;

export default locationSlice.reducer;
