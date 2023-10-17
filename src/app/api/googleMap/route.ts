import {distanceMatrix} from "@/src/utils/GoogleMapsUtils";

export async function POST(request: Request) {
  const data = await request.json();

  let res = [];

  for (const item of data) {
    const {origin, destination, time} = item;
    const result = await distanceMatrix(origin, destination, time);
    res.push({
      distance: result.rows[0].elements[0].distance.text,
      duration: result.rows[0].elements[0].duration.text
    });
  }

  return new Response(JSON.stringify(res));
}