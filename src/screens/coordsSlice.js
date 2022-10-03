import {createSlice} from '@reduxjs/toolkit';

const initialState = [
  {lat: null, lon: null, source: null},
  {lat: null, lon: null, source: null},
];

export const coordsSlice = createSlice({
  name: 'coords',
  initialState,
  reducers: {
    saveCoords: (state, action) => {
      const coordObj = action.payload;
      state[coordObj.index].lat = coordObj.lat;
      state[coordObj.index].lon = coordObj.lon;
      state[coordObj.index].source = coordObj.source;
    },
  },
});

export const {saveCoords} = coordsSlice.actions;

export default coordsSlice.reducer;
