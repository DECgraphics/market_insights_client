import React, { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { DivIcon, Icon, point } from 'leaflet'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { MarkerType } from '../../types/Marker';
import { getPreviousMapCoordinates } from '../../state/map/mapSlice';


export default function Map() {
    const coordinates = useSelector((state: RootState) => state.map.coordinates)
    const dispatch = useDispatch<AppDispatch>()
    
    useEffect(() => {
        dispatch(getPreviousMapCoordinates())
    }, [])

    const customIcon = new Icon({
        iconUrl: require('../../assets/location.png'),
        iconSize: [50,50]
    })

    const createCustomClusterIcon = (cluster: any) => {
        return new DivIcon({
            html: `<div class="cluster-icon">${cluster.getChildCoint()}</div>`,
            className: 'custom-marker-cluster',
            iconSize: point(33,33, true)
        })
    }


    const position: [number, number] = [48.8566, 2.3522]

    let mapMarkers = coordinates.length > 0 ? (coordinates.map((geoMarker, i) => {
            return (
                <Marker key={i} position={geoMarker.geoCode} icon={customIcon}>
                    <Popup>
                        {geoMarker.description}
                    </Popup>
                </Marker>
            )
    })): null

    return (
        <MapContainer center={position} zoom={10} style={{
            height: '100vh',
            width: '100%'
        }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <MarkerClusterGroup
                chunckedkLoading
                 inconCreateFunction={createCustomClusterIcon}
            > */}
                {mapMarkers}
            {/* </MarkerClusterGroup> */}
        </MapContainer>
    )
}
