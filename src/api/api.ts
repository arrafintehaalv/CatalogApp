import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../app/store';
import { ProductDetails } from '../types/Product';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    login: builder.mutation<
      {
        id: number;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        token: string;
      },
      {
        username: string;
        password: string;
      }
    >({
      query: credentials => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    getProducts: builder.query<
      {
        products: {
          id: number;
          title: string;
          description: string;
          price: number;
          brand: string;
          thumbnail: string;
        }[];
        total: number;
        skip: number;
        limit: number;
      },
      { limit: number; skip: number }
    >({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
    }),
    getProductById: builder.query<ProductDetails, number>({
      query: id => `products/${id}`,
    }),
  }),
});

export const { useLoginMutation, useGetProductsQuery, useGetProductByIdQuery } =
  api;
