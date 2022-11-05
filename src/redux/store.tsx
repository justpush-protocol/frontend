import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appSlice'
import accountReducer from './accountSlice'
import { justPushApi } from '../api'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    app: appReducer,
    account: accountReducer,
    justPushApi: justPushApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(justPushApi.middleware),
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch