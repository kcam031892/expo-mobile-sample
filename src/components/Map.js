import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../shared/redux/slices/navSlice';
import MapViewDirection from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from '@env';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?unit=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_API_KEY}`;
      const response = await fetch(URL);
      const data = await response.json();
      dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_API_KEY]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType='mutedStandard'
      initialRegion={{
        latitude: origin?.location?.lat || 37.78825,
        longitude: origin?.location?.lng || -122.4324,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirection
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_API_KEY}
          strokeColor='black'
          strokeWidth={3}
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin?.location?.lat || 37.78825,
            longitude: origin?.location?.lng || -122.4324,
          }}
          title='Origin'
          description={origin.description}
          identifier='origin'
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination?.location?.lat || 37.78825,
            longitude: destination?.location?.lng || -122.4324,
          }}
          title='Origin'
          description={destination.description}
          identifier='origin'
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
