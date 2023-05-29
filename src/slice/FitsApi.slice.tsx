/* eslint-disable prettier/prettier */
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {url} from '../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginInterface} from './storeInterface';

// Define a service using a base URL and expected endpoints
export const fitsApi = createApi({
  reducerPath: 'fitsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: async (headers: Headers) => {
      const userToken: string | null = await AsyncStorage.getItem('userData');
      let token;
      if (userToken) {
        token = JSON.parse(userToken ?? '');
      }
      if (token?.access_token) {
        headers.set('Authorization', `Bearer ${token.access_token}`);
      }
      // headers.set('Access-Control-Allow-Origin', '*');
      // headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      // headers.set(
      //   'Access-Control-Allow-Headers',
      //   'Authorization, Content-Type',
      // );

      // headers.set('Content-Type', 'application/json');
      return headers;
    },
    // responseHandler: async response => {
    //   console.log('res====>>>>', response);
    //   const data = await response.json();
    //   if (!response.ok) {
    //     throw new Error(data.error.message);
    //   }
    //   return data;
    // },
  }),
  endpoints: builder => ({
    getUsers: builder.query<any[], void>({
      query: () => 'users',
    }),
    getUserMe: builder.query<any, Partial<any>>({
      query: id => `/user/me/${id}`,
    }),
    registerUser: builder.mutation<LoginInterface, Partial<any>>({
      query: body => ({
        url: '/register',
        method: 'POST',
        body: body,
      }),
    }),
    loginUser: builder.mutation<LoginInterface, Partial<any>>({
      query: body => ({
        url: '/login',
        method: 'POST',
        body: body,
      }),
    }),
    updateUser: builder.mutation<any, Partial<any>>({
      query: user => ({
        url: `users/${user.id}`,
        method: 'PUT',
        body: user,
      }),
    }),
    deleteUser: builder.mutation<void, number>({
      query: id => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),

  // getPokemonByName: builder.query<any, string>({
  //   query: name => `pokemon/${name}`,
  // }),
  // createData: builder.mutation({
  //   query: data => ({
  //     url: '/data',
  //     method: 'POST',
  //     body: data,
  //   }),
  // }),
  // RegisterUser: builder.mutation({
  //   query: data => ({
  //     url: '/register',
  //     method: 'POST',
  //     body: data,
  //   }),
  // }),
});

// });

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const {useGetPokemonByNameQuery} = fitsApi;
// Export the generated hooks for using the endpoints
export const {
  useGetUserMeQuery,
  useGetUsersQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = fitsApi;
