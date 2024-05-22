import React, { useEffect } from 'react'
import { FeatureGroup, MapContainer, Marker, Popup, TileLayer, useMap, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { DivIcon, Icon, point } from 'leaflet'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { MarkerType } from '../../types/Marker';
import { getPreviousMapCoordinates } from '../../state/map/mapSlice';
import * as geojson from 'geojson';
import EditControlFC from '../../hooks/useEditControl';
// import { EditControl } from "react-leaflet-draw"




var myLines = [{
    "type": "LineString",
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, {
    "type": "LineString",
    "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];


// L.geoJSON(geojsonFeature).addTo(map);






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


    let geojsonFeatureCollection: geojson.FeatureCollection = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "coordinates": [
                [
                  [
                    2.272497845898016,
                    48.85541509882566
                  ],
                  [
                    2.2682803458409637,
                    48.84508691096772
                  ],
                  [
                    2.283990637662839,
                    48.82535168558823
                  ],
                  [
                    2.314933067103624,
                    48.83327307740319
                  ],
                  [
                    2.3158154835182074,
                    48.86011855963295
                  ],
                  [
                    2.272497845898016,
                    48.85541509882566
                  ]
                ]
              ],
              "type": "Polygon"
            }
          }
        ]
      }

      const geoJsonPoint: geojson.Point = { type: "Point", coordinates: [ 40, 5 ] }

    return (
        <>
        <MapContainer center={position} zoom={10} style={{
            height: '100vh',
            width: '100%'
        }}>
            {/* <EditControlFC
   
            /> */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON data={geojsonFeatureCollection}  />

            <MarkerClusterGroup
                chunckedkLoading
                 inconCreateFunction={createCustomClusterIcon}
            > 
                {mapMarkers}
            </MarkerClusterGroup>
        </MapContainer>
        </>
    )
}
