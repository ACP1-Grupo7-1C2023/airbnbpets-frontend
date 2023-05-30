import { Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
const MAPBOX_TOKEN = 'pk.eyJ1IjoibmFodWNhc3RybyIsImEiOiJjbGlhYTAwcmgwMWRmM2VseDkyNWhjaDR1In0.tHQepuLTFZYdI8XuIpyBjg'; // Set your mapbox token here

type MapComponentProps = {
  position: { latitude: number, longitude: number } | undefined,
  onChangePosition: (position: { latitude: number, longitude: number }) => void
}

export const MapComponent = ({position, onChangePosition}: MapComponentProps) => {
  const [viewState, setViewState] = useState({
    latitude: -34.61773011503033,
    longitude: -58.36862775813192,
    zoom: 14
  });

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      onClick={evt => onChangePosition({
        latitude: evt.lngLat.lat,
        longitude: evt.lngLat.lng
      })}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {position && (
        <Marker longitude={position.longitude} latitude={position.latitude} color="red" />
      )}
    </Map>
  );
}