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