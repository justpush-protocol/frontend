import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetNotificationsResponse,
  GetNotificationsRequest,
  AddNotificationResponse,
  AddGroupRequest,
  AddGroupResponse,
  SubscribeResponse,
  SubscribeRequest,
  AddNotificationRequest,
  UnsubscribeResponse,
  UnsubscribeRequest,
} from "@justlabs-platform/just-push-api-types";

export const justPushApi = createApi({
  reducerPath: "justPushApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getNotifications: builder.mutation<
      GetNotificationsResponse,
      { request: GetNotificationsRequest }
    >({
      query: ({ request }) => ({
        url: "/notification/get",
        method: "POST",
        body: request,
      }),
    }),
    addNotification: builder.mutation<
      AddNotificationResponse,
      { request: AddNotificationRequest; signature: string; publicKey: string }
    >({
      query: ({ request, signature, publicKey }) => ({
        url: "/notification/new",
        method: "POST",
        body: request,
        headers: {
          "Content-Type": "application/json",
          "x-signature": signature,
          "x-public-key": publicKey,
        },
      }),
    }),
    addGroup: builder.mutation<
      AddGroupResponse,
      { request: AddGroupRequest; signature: string; publicKey: string }
    >({
      query: ({ request, signature, publicKey }) => ({
        url: "/group/new",
        method: "POST",
        body: request,
        headers: {
          "Content-Type": "application/json",
          "x-signature": signature,
          "x-public-key": publicKey,
        },
      }),
    }),
    subscribe: builder.mutation<
      SubscribeResponse,
      { request: SubscribeRequest; signature: string; publicKey: string }
    >({
      query: ({ request, signature, publicKey }) => ({
        url: "/group/new",
        method: "POST",
        body: request,
        headers: {
          "Content-Type": "application/json",
          "x-signature": signature,
          "x-public-key": publicKey,
        },
      }),
    }),
    unSubscribe: builder.mutation<
      UnsubscribeResponse,
      { request: UnsubscribeRequest; signature: string; publicKey: string }
    >({
      query: ({ request, signature, publicKey }) => ({
        url: "/group/new",
        method: "POST",
        body: request,
        headers: {
          "Content-Type": "application/json",
          "x-signature": signature,
          "x-public-key": publicKey,
        },
      }),
    }),
  }),
});

export const {
  useGetNotificationsMutation,
  useAddNotificationMutation,
  useAddGroupMutation,
  useSubscribeMutation,
  useUnSubscribeMutation,
} = justPushApi;
