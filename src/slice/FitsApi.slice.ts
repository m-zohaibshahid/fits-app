/* eslint-disable prettier/prettier */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../constants/url";
import { LoginInterface, UserMeApiResponse } from "./store.interface";
import { getUserAsyncStroageToken } from "../utils/async-storage";

// Define a service using a base URL and expected endpoints
export const fitsApi = createApi({
  reducerPath: "fitsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: async (headers: Headers) => {
      const token = await getUserAsyncStroageToken()
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getUsers: builder.query<any[], void>({
      query: () => "users",
    }),

    getUserMe: builder.query<UserMeApiResponse, Partial<any>>({
      keepUnusedDataFor: 30,
      query: () => `/user/me`
    }),

    registerUser: builder.mutation<any, Partial<any>>({
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

    codeVerify: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: "/code-verify",
        method: "POST",
        body: body,
      }),
    }),

    resendVarificationCode: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: "/resend-email",
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

    updatePassword: builder.mutation<void, Partial<any>>({
      query: ({ id, ...data }) => ({
        url: `/profile/edit/password/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    sessions: builder.query<void, Partial<any>>({
      query: () => "/session",
    }),

    connectAccountLink: builder.query<void, Partial<any>>({
      query: () => "/stripe/connect/accountLink",
    }),

    trainerSession: builder.query<any, Partial<any>>({
      query: (id) => `/session/trainer/${id}`,
    }),

    personalInfoCreate: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: "/personal",
        method: "POST",
        body: body,
      }),
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
  useCodeVerifyMutation,
  useResendVarificationCodeMutation,
  useSessionsQuery,
  useConnectAccountLinkQuery,
  useGetUserMeQuery,
  useGetUsersQuery,
  useTrainerSessionQuery,
  usePersonalInfoCreateMutation,
} = fitsApi;
