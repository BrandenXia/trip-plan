import {distanceMatrix} from "@/src/utils/GoogleMapsUtils";
import {TrafficModel} from "@googlemaps/google-maps-services-js";

export async function POST(request: Request) {
  const data = await request.json();

  let res = [];

  for (const item of data) {
    const {origin, destination, time} = item;
    const result1 = await distanceMatrix(origin, destination, time, TrafficModel.pessimistic);
    const result2 = await distanceMatrix(origin, destination, time, TrafficModel.optimistic);
    res.push({
      distance: result1.rows[0].elements[0].distance.text,
      duration: [result2.rows[0].elements[0].duration_in_traffic?.text ?? result2.rows[0].elements[0].duration.text,
        result1.rows[0].elements[0].duration_in_traffic?.text ?? result1.rows[0].elements[0].duration.text
      ]
    });
  }

  return new Response(JSON.stringify(res));
}