import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {startWaiting, stopWaiting} from '../screens/statusSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.geocod.io/v1.7'}),
  keepUnusedDataFor: 3600,
  endpoints: builder => ({
    getCoords: builder.query({
      query: address =>
        `/geocode?q=${encodeURIComponent(address)}&api_key=API_KEY`,
      async onQueryStarted(address, {dispatch, queryFulfilled}) {
        dispatch(startWaiting());
        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
        } finally {
          dispatch(stopWaiting());
        }
      },
    }),
  }),
});

export const {useGetCoordsQuery} = apiSlice;
