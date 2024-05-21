import { configureStore } from '@reduxjs/toolkit'
import auth from './auth/authSlice'
import map from './map/mapSlice'

export const store = configureStore({
  reducer: {
    auth,
    map
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
