import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MarkerType, MinMaxLatLng } from "../../types/Marker";

let baseUrl = process.env.REACT_APP_BASE_URL

interface MapState {
    coordinates: MarkerType[]
    minMaxlatLng: MinMaxLatLng
    response: any[]
}

const initialState: MapState = {
    coordinates: [],
    minMaxlatLng: {
        maxLat: -86,
		maxLng: -181,
		minLat: 86,
		minLng: 181
    },
    response: [] 
}

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        clearMap: (state) => {
            state.coordinates = []
        },
        setMinMaxlatLng: (state, action: PayloadAction<MinMaxLatLng>) => {
            state.minMaxlatLng = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPreviousMapCoordinates.pending, () => {
            console.log('coordinates pending')
        }).addCase(getPreviousMapCoordinates.fulfilled, (state, action: PayloadAction<MarkerType[]>) => {
            console.log(action.payload)
            state.coordinates = action.payload
        })

        builder.addCase(getMinMaxLatLngLocations.pending, () => {
            console.log('response pending')
        }).addCase(getMinMaxLatLngLocations.fulfilled, (state, action: PayloadAction<any[]>) => {
            console.log(action.payload)
            state.response = action.payload
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

// export const getMinMaxLatLngLocations = createAsyncThunk(
//     'map/getMinMaxLatLngLocations',
//     async (latLng: MinMaxLatLng) => {
//         const response = await fetch(`${baseUrl}/search/?min_lat=${latLng.minLat}&max_lat=${latLng.maxLat}&min_lon=${latLng.minLng}&max_lon=${latLng.maxLng}`)
//         const coorditates = (await response.json()) as any[]
//         return coorditates
//     }
// )

export const getMinMaxLatLngLocations = createAsyncThunk(
    'map/getMinMaxLatLngLocations',
    async (latLng: MinMaxLatLng) => {
        const response = await fetch(`${baseUrl}/search/npostcodes/?min_lat=${latLng.minLat}&max_lat=${latLng.maxLat}&min_lon=${latLng.minLng}&max_lon=${latLng.maxLng}`)
        const coorditates = (await response.json()) as any[]
        return coorditates
    }
)

export const { setMinMaxlatLng, clearMap } = mapSlice.actions

export default mapSlice.reducer