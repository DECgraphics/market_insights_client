import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { User } from "../../types/User"

interface AuthState {
    authenticated: boolean
    user: User | null
}

const initialState: AuthState = {
    authenticated: false,
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authorise: (state, action: PayloadAction<User>) => {
            state.authenticated = true
            state.user = action.payload
        },
        unauthorise: (state) => {
            state.authenticated = false
            state.user = null
        },
    }
})

export const { authorise, unauthorise } = authSlice.actions

export default authSlice.reducer

