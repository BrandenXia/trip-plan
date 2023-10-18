import {Client, TrafficModel, TravelMode} from "@googlemaps/google-maps-services-js";

const client = new Client();

async function distanceMatrix(origin: string, destination: string, time: number | null, traffic_model: TrafficModel) {
  const response = await client.distancematrix({
    params: {
      origins: [origin],
      destinations: [destination],
      mode: TravelMode.driving,
      departure_time: time ?? undefined,
      traffic_model: time ? traffic_model : undefined,
      key: process.env.GOOGLE_MAPS_API_KEY || "",
    },
  });

  return response.data;
}

export {
  distanceMatrix
}