export interface Point {
  lat_point?: number;
  long_point?: number;
}
export interface Ride {
  id?: number;
  title?: string;
  points?: Point[];
  car_id?: string;
  car_brand?: string;
  free_seats?: number;
  start_date?: number;
}
export interface RideSetup {
  route?: string;
  brand?: string;
  uniqKey?: string;
  date?: number;
  freeSeats?: number;
  nrStops?: number;
}
