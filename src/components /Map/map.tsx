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
import EditControlFC from './drawTools';
import DrawTools from './drawTools';



export default function Map() {
    const coordinates = useSelector((state: RootState) => state.map.coordinates)
    const dispatch = useDispatch<AppDispatch>()
    
    useEffect(() => {
        // dispatch(getPreviousMapCoordinates())
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


    const position: [number, number] = [51.52013634986723, -0.13121614162092013]



    // let mapMarkers = coordinates.length > 0 ? (coordinates.map((geoMarker, i) => {
    //         // console.log('in the marker')
    //         // console.log(geoMarker)
    //         return (
    //             <Marker key={i} position={geoMarker.bottom_left} icon={customIcon}>
    //                 <Popup>
    //                     {geoMarker.n_postcodes}
    //                 </Popup>
    //             </Marker>
    //         )
    // })): null


    




    let geojsonFeatureCollection: geojson.FeatureCollection = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
              id: 1
            },
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [-0.2813794644393531, 51.507668433994006],
                  [-0.2813794644393531, 51.51680927754244],
                  [-0.26187529576506946, 51.51680927754244],
                  [-0.26187529576506946, 51.507668433994006]
                ]
            ]
            },
          },
          {
            "type": "Feature",
            "properties": {
              id: 2
            },
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [-0.18132154153832783, 51.484439917697465],
                  [-0.18132154153832783,51.48930446398618],
                  [-0.17488310557630674, 51.48930446398618],
                  [-0.17488310557630674,51.484439917697465]
                ]
              ]
            }
          }
        ]
      }

  
      // const geoJsonPoint: geojson.Point = { type: "Point", coordinates: [ 40, 5 ] }

      if(coordinates.length > 0) {
       console.log('THIS IS BEING CALLED')

        geojsonFeatureCollection = {
          "type": "FeatureCollection",
          "features": coordinates.map((geoMarker, i) => {
            
            return {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "Polygon",
                  "coordinates": [
                    [
                      // geoMarker.bottom_left.reverse(),
                      // geoMarker.bottom_right.reverse(),
                      // geoMarker.upper_right.reverse(),
                      // geoMarker.upper_left.reverse()
                      [geoMarker.bottom_left[1], geoMarker.bottom_left[0]],
                      [geoMarker.bottom_right[1], geoMarker.bottom_right[0]],
                      [geoMarker.upper_right[1], geoMarker.upper_right[0]],
                      [geoMarker.upper_left[1], geoMarker.upper_left[0]]
                    ]
                  ]

                },
              }
          })
        }
        console.log(geojsonFeatureCollection)
      }

    return (
        <>
        <MapContainer center={position} zoom={10} style={{
            height: '100vh',
            width: '100%'
        }}>
            <DrawTools/>

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {coordinates.length > 0 ? <GeoJSON data={geojsonFeatureCollection} /> : null}

            {/* <MarkerClusterGroup
                chunckedkLoading
                 inconCreateFunction={createCustomClusterIcon}
            > 
                {mapMarkers}
            </MarkerClusterGroup> */}
        </MapContainer>
        </>
    )
}
