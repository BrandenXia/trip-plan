import {distanceMatrix} from "@/src/utils/GoogleMapsUtils";
import {TrafficModel} from "@googlemaps/google-maps-services-js";

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

function formatDistance(meters: number) {
  const miles = meters / 1609.344;
  return `${miles.toFixed(1)}`;
}


export async function POST(request: Request) {
  const data = await request.json();

  let res = [];

  for (const item of data) {
    const {origin, destination, time} = item;
    const result1 = await distanceMatrix(origin, destination, time, TrafficModel.pessimistic);
    const result2 = await distanceMatrix(origin, destination, time, TrafficModel.optimistic);
    res.push({
      distance: formatDistance(result1.rows[0].elements[0].distance.value),
      duration: [formatDuration(result2.rows[0].elements[0].duration_in_traffic?.value ?? result2.rows[0].elements[0].duration.value),
        formatDuration(result1.rows[0].elements[0].duration_in_traffic?.value ?? result1.rows[0].elements[0].duration.value)
      ]
    });
  }

  return new Response(JSON.stringify(res));
}