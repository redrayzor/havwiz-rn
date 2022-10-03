import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  LocationPermission: false,
  awaitingResponse: false,
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    PermissionGranted: state => {
      state.LocationPermission = true;
    },
    startWaiting: state => {
      state.awaitingResponse = true;
    },
    stopWaiting: state => {
      state.awaitingResponse = false;
    },
  },
});

export const {PermissionGranted, startWaiting, stopWaiting} =
  statusSlice.actions;

export default statusSlice.reducer;
