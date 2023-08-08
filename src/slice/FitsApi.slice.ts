/* eslint-disable prettier/prettier */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../constants/url";
import { LoginInterface, UserMeApiResponse } from "./store.interface";
import { getUserAsyncStroageToken } from "../utils/async-storage";
import { RoomMessagesResponse, TrainerSessionApiResultInterface, TrainerVideosForTrainerDetailsApiResponse } from "../interfaces";
import { GetBookedVideosApiInterface } from "../Screens/TraineeScreens/MyBookedVideos";
import { GetMyBookedSessionsApiInterface } from "../Screens/TraineeScreens/ScheduledClasses";

// Define a service using a base URL and expected endpoints
export const fitsApi = createApi({
  reducerPath: "fitsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: async (headers: Headers) => {
      const token = await getUserAsyncStroageToken();

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
      query: () => `/user/me`,
    }),

    getChatRooms: builder.query({
      keepUnusedDataFor: 30,
      query: () => `/chat/rooms`,
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

    personalInfo: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: "/personal",
        method: "POST",
        body: body,
      }),
    }),

    personalInfoUpdate: builder.mutation<any, Partial<any>>({
      query: ({ id: userId, body }) => ({
        url: `/personal/${userId}`,
        method: "PUT",
        body: body,
      }),
    }),

    professionInfoUpdate: builder.mutation<any, Partial<any>>({
      query: ({ id: userId, body }) => ({
        url: `/profession/${userId}`,
        method: "PUT",
        body: body,
      }),
    }),

    trainerProfessionalInfoCreate: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: "/profession",
        method: "POST",
        body: body,
      }),
    }),

    sendMessage: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: "/chat/message/create",
        method: "POST",
        body: body,
      }),
    }),

    uploadVideo: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: "/video",
        method: "POST",
        body: body,
      }),
    }),

    fitnessLevelChoose: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: `/user/fitness/choose`,
        method: "PUT",
        body: body,
      }),
    }),

    addCustomService: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: `/services`,
        method: "POST",
        body: body,
      }),
    }),

    addNewGoal: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: `/goals`,
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

    videoUpdate: builder.mutation<any, Partial<any>>({
      query: ({ id, body }) => ({
        url: `/video/${id}`,
        method: "PUT",
        body: body,
      }),
    }),

    createStripeCard: builder.mutation<any, Partial<any>>({
      query: ({ id, body }) => ({
        url: `/stripe/card/${id}`,
        method: "POST",
        body,
      }),
    }),

    stripePaymentTransfer: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: `/stripe/transfer`,
        method: "POST",
        body,
      }),
    }),

    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),

    sessionDel: builder.mutation<void, string>({
      query: (id) => ({
        url: `/session/${id}`,
        method: "DELETE",
      }),
    }),

    videoDel: builder.mutation<void, string>({
      query: (id) => ({
        url: `/video/${id}`,
        method: "DELETE",
      }),
    }),

    sessionCreate: builder.mutation<void, Partial<any>>({
      query: (body) => ({
        url: `/session`,
        method: "POST",
        body: body,
      }),
    }),

    createChatRoom: builder.mutation<void, Partial<any>>({
      query: (body) => ({
        url: `/chat/room/create`,
        method: "POST",
        body: body,
      }),
    }),

    updatePassword: builder.mutation<void, Partial<any>>({
      query: ({ id, data }) => ({
        url: `/profile/edit/password/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    bookASession: builder.mutation<void, Partial<any>>({
      query: (data) => ({
        url: `/book-a-session`,
        method: "POST",
        body: data,
      }),
    }),

    sessions: builder.query<TrainerSessionApiResultInterface, Partial<any>>({
      query: () => "/session",
    }),

    connectAccountLink: builder.mutation<void, Partial<any>>({
      query: (body) => ({ url: `/stripe/connect/accountLink`, method: "POST", body: body }),
    }),

    trainerSession: builder.query<any, string>({
      query: (id) => `/session/trainer/${id}`,
    }),

    traineeSessionRecomment: builder.query<any, any>({
      query: () => `/session/recommended`,
    }),

    submitReviews: builder.mutation<any, any>({
      query: (body) => ({
        url: `/review`,
        method: "POST",
        body
      }),
    }),

    getMyAllCreatedVideos: builder.query<any, any>({
      query: (id) => `/video/${id}`,
    }),

    getMyBookedClasses: builder.query<GetMyBookedSessionsApiInterface, any>({
      query: () => `/get-booked-sessions`,
    }),

    getTrainerReviews: builder.query<any, any>({
      query: (id) => `/review/${id}`,
    }),

    getMyBookedVideos: builder.query<GetBookedVideosApiInterface, any>({
      query: (id) => `/subscription/videos/${id}`,
    }),

    stripeCustomerGet: builder.query<any, string>({
      query: (id) => ({
        url: `/stripe/customer/${id}`,
        method: "GET",
      }),
    }),

    videoSubscribe: builder.mutation<void, Partial<any>>({
      query: (body) => ({
        url: `/subscription/videos`,
        method: "POST",
        body: body,
      }),
    }),

    getRoomMessages: builder.query<RoomMessagesResponse, any>({
      query: (id) => `chat/messages/${id}`,
    }),

    getTrainerVideosForTrainerDetails: builder.query<TrainerVideosForTrainerDetailsApiResponse, any>({
      query: (id) => `video/${id}`,
    }),

    getSubscribedVideos: builder.query<any, any>({
      query: (id) => `subscription/videos/${id}`,
    }),

    getStripeUser: builder.query<any, string>({
      query: (id) => `stripe/customer/${id}`,
    }),

    personalInfoCreate: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: "/personal",
        method: "POST",
        body: body,
      }),
    }),
    rechargeStripe: builder.mutation<any, Partial<any>>({
      query: ({ id, body }) => ({
        url: `/stripe/recharge/${id}`,
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
  useVideoDelMutation,
  useVideoUpdateMutation,
  useSessionDelMutation,
  useBookASessionMutation,
  useUpdatePasswordMutation,
  useStripeCustomerMutation,
  useUpdateFilterMutation,
  usePersonalInfoUpdateMutation,
  useRechargeStripeMutation,
  useCreateStripeCardMutation,
  usePersonalInfoMutation,
  useCodeVerifyMutation,
  useResendVarificationCodeMutation,
  useSessionsQuery,
  useConnectAccountLinkMutation,
  useGetUserMeQuery,
  useGetUsersQuery,
  useTrainerSessionQuery,
  useGetMyAllCreatedVideosQuery,
  usePersonalInfoCreateMutation,
  useTrainerProfessionalInfoCreateMutation,
  useFitnessLevelChooseMutation,
  useAddCustomServiceMutation,
  useAddNewGoalMutation,
  useSessionCreateMutation,
  useCreateChatRoomMutation,
  useGetChatRoomsQuery,
  useStripeCustomerGetQuery,
  useGetRoomMessagesQuery,
  useSendMessageMutation,
  useGetMyBookedClassesQuery,
  useUploadVideoMutation,
  useGetTrainerVideosForTrainerDetailsQuery,
  useGetSubscribedVideosQuery,
  useGetStripeUserQuery,
  useStripePaymentTransferMutation,
  useVideoSubscribeMutation,
  useGetMyBookedVideosQuery,
  useTraineeSessionRecommentQuery,
  useSubmitReviewsMutation,
  useGetTrainerReviewsQuery,
  useProfessionInfoUpdateMutation,
} = fitsApi;
