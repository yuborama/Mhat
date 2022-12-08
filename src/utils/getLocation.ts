import * as Location from 'expo-location';
import { LocationGeocodedAddress, LocationObjectCoords } from 'expo-location';

export type locationType = {
  address: LocationGeocodedAddress[];
  coords: LocationObjectCoords;
  addressString: string;
  timestamp: number;
};

const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return;
  }
  const location = await Location.getCurrentPositionAsync();
  const address = await Location.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });
  const addressString = `${address[0]?.name}, ${address[0]?.street}, ${address[0]?.postalCode}, ${address[0]?.city}`;
  console.log(`address`, address);

  return { ...location, address, addressString };
};

export default getLocation;
