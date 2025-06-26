import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: builder => ({
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: body => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    getUser: builder.query({
      query: () => 'auth/me',
    }),
  }),
});
