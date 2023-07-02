/* eslint-disable prettier/prettier */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginInterface } from "./store.interface";

// Define a service using a base URL and expected endpoints
export const fitsApi = createApi({
  reducerPath: "fitsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: async (headers: Headers) => {
      const userToken: string | null = await AsyncStorage.getItem("userData");
      let token;
      if (userToken) {
        token = JSON.parse(userToken ?? "");
      }
      if (token?.access_token) {
        headers.set("Authorization", `Bearer ${token.access_token}`);
      }
      return headers;
    },
  }),
  // keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getUsers: builder.query<any[], void>({
      query: () => "users",
    }),
    getUserMe: builder.query<any, Partial<any>>({
      query: (id) => `/user/me/${id}`,
    }),

    registerUser: builder.mutation<LoginInterface, Partial<any>>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body: body,
      }),
    }),

    loginUser: builder.mutation<LoginInterface, Partial<any>>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body: body,
      }),
    }),

    stripeCustomer: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: "/stripe/customer",
        method: "POST",
        body: body,
      }),
    }),

    updateUser: builder.mutation<any, Partial<any>>({
      query: (user) => ({
        url: `users/${user.id}`,
        method: "PUT",
        body: user,
      }),
    }),

    updateFilter: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: `/filter`,
        method: "PUT",
        body: data,
      }),
    }),

    createStripeCard: builder.mutation<any, Partial<any>>({
      query: (id, ...data) => ({
        url: `/stripe/card/${id}`,
        method: "POST",
        body: data,
      }),
    }),

    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),

    sessionDel: builder.mutation<void, number>({
      query: (id) => ({
        url: `/session/${id}`,
        method: "DELETE",
      }),
    }),

    //updatePassword
    updatePassword: builder.mutation<void, Partial<any>>({
      query: ({ id, ...data }) => ({
        url: `/profile/edit/password/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    //user Me
    sessions: builder.query<void, Partial<any>>({
      query: () => "/session",
    }),

    //Connect account link
    connectAccountLink: builder.query<void, Partial<any>>({
      query: () => "/stripe/connect/accountLink",
    }),

    // }),

    //trainer screen api

    trainerSession: builder.query<any, Partial<any>>({
      query: (id) => `/session/trainer/${id}`,
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useSessionDelMutation,
  useUpdatePasswordMutation,
  useStripeCustomerMutation,
  useUpdateFilterMutation,
  useCreateStripeCardMutation,
  useSessionsQuery,
  useConnectAccountLinkQuery,
  useGetUserMeQuery,
  useGetUsersQuery,
  useTrainerSessionQuery,
} = fitsApi;
