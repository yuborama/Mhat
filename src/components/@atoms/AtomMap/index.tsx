import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import MapView, { MapMarkerProps, Marker } from 'react-native-maps';
import AtomView from '../AtomView';

interface AtomMapType {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
  markers?: MapMarkerProps[];
  style?: ViewStyle;
}

const AtomMap: FC<AtomMapType> = (props) => {
  const {
    latitude = 0,
    longitude = 0,
    latitudeDelta = 0.00922,
    longitudeDelta = 0.00421,
    markers,
    style,
  } = props;

  return (
    <AtomView
      style={[
        {
          width: '100%',
          height: '100%',
        },
        style,
      ]}
    >
      {latitude !== 0 && longitude !== 0 && (
        <MapView
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {markers?.map((marker, i) => (
            <Marker key={`marker-${i}`} {...marker} />
          ))}
        </MapView>
      )}
    </AtomView>
  );
};
export default AtomMap;
