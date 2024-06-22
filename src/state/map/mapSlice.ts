import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MarkerType } from "../../types/Marker";

let baseUrl = process.env.REACT_APP_BASE_URL

interface MapState {
    coordinates: MarkerType[]
}

const initialState: MapState = {
    coordinates: []
}

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        clearMap: (state) => {
            state.coordinates = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPreviousMapCoordinates.pending, () => {
            console.log('coordinates pending')
        }).addCase(getPreviousMapCoordinates.fulfilled, (state, action: PayloadAction<MarkerType[]>) => {
            console.log(action.payload)
            state.coordinates = action.payload
        })
    }
})

export const getPreviousMapCoordinates = createAsyncThunk(
    'map/getPreviousCoorditates',
    async () => {
        const response = await fetch(`${baseUrl}/get_coordinates`)
        const coorditates = (await response.json()) as MarkerType[]
        return coorditates
    }
)

export const { clearMap } = mapSlice.actions

export default mapSlice.reducer