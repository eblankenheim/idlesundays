export interface Event {
  id: string;
  title: string;
  start: string; // ISO date string
  description: string;
  location: string;
  url: string; // Google Maps URL
  locationImageUrl: string;
  facebookEventId?: string;
}
