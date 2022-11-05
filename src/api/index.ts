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
  ListGroupResponse,
  ListGroupRequest,
} from "@justpush/api-types";

export const justPushApi = createApi({
  reducerPath: "justPushApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getNotifications: builder.query<
      GetNotificationsResponse,
      { request: GetNotificationsRequest; publicKey: string }
    >({
      query: ({ request, publicKey }) => ({
        url: "v1/unsigned/notification/list",
        method: "POST",
        body: request,
        headers: {
          "Content-Type": "application/json",
          "x-public-key": publicKey,
        },
      }),
    }),
    listGroups: builder.query<
      ListGroupResponse,
      { request: ListGroupRequest; publicKey: string }
    >({
      query: ({ request, publicKey }) => ({
        url: "v1/unsigned/group/list",
        method: "POST",
        body: request,
        headers: {
          "Content-Type": "application/json",
          "x-public-key": publicKey,
        },
      }),
    }),
    addNotification: builder.mutation<
      AddNotificationResponse,
      { request: AddNotificationRequest; signature: string; publicKey: string }
    >({
      query: ({ request, signature, publicKey }) => ({
        url: "v1/signed/notification/new",
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
      { request: AddGroupRequest; publicKey: string }
    >({
      query: ({ request, publicKey }) => ({
        url: "v1/unsigned/group/new",
        method: "POST",
        body: request,
        headers: {
          "Content-Type": "application/json",
          "x-public-key": publicKey,
        },
      }),
    }),
    subscribe: builder.mutation<
      SubscribeResponse,
      { request: SubscribeRequest; signature: string; publicKey: string }
    >({
      query: ({ request, signature, publicKey }) => ({
        url: "v1/signed/group/subscribe",
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
        url: "v1/signed/group/unsubscribe",
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
  useGetNotificationsQuery,
  useListGroupsQuery,
  useAddNotificationMutation,
  useAddGroupMutation,
  useSubscribeMutation,
  useUnSubscribeMutation,
} = justPushApi;
