import axios from "axios";

export const reverseGeocode = async (lat: number, lng: number) => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
    if (response.data) {
      console.log(response.data.display_name)
      return response.data.display_name;
    }
  } catch (error) {
    console.error('Error en la solicitud de geocodificación inversa:', error);
  }
}

type Location = {
  latitude: number;
  longitude: number;
}

export const getDistance = (location1: Location, location2: Location) => {
  if (Number.isNaN(location1.latitude) || Number.isNaN(location1.longitude) || Number.isNaN(location2.latitude) || Number.isNaN(location2.longitude)) {
    return Infinity;
  }
  const R = 6371; // Radio de la Tierra en kilómetros
  const dLat = degToRad(location2.latitude - location1.latitude);
  const dLon = degToRad(location2.longitude - location1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(location1.latitude)) * Math.cos(degToRad(location2.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

const degToRad = (degrees: number) => {
  return degrees * (Math.PI / 180);
}