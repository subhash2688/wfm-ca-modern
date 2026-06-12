export interface CampusData {
  name: string;
  city: string;
  zipCode: string;
  region: string;
  color: string;
  logo: string;
  lat: number;
  lng: number;
}

export const WFM_CAMPUSES: CampusData[] = [
  { name: "De Anza College",         city: "Cupertino",       zipCode: "95014", region: "South Bay", color: "green",  logo: "/images/campuses/de-anza.svg",      lat: 37.3186, lng: -122.0455 },
  { name: "Foothill College",        city: "Los Altos Hills", zipCode: "94022", region: "South Bay", color: "blue",   logo: "/images/campuses/foothill.svg",     lat: 37.3614, lng: -122.1287 },
  { name: "West Valley College",     city: "Saratoga",        zipCode: "95070", region: "South Bay", color: "purple", logo: "/images/campuses/west-valley.svg",  lat: 37.2562, lng: -122.0119 },
  { name: "Chabot College",          city: "Hayward",         zipCode: "94545", region: "East Bay",  color: "red",    logo: "/images/campuses/chabot.png",       lat: 37.6470, lng: -122.0820 },
  { name: "Ohlone College",          city: "Fremont",         zipCode: "94539", region: "East Bay",  color: "orange", logo: "/images/campuses/ohlone.jpg",       lat: 37.5497, lng: -121.9248 },
  { name: "Las Positas College",     city: "Livermore",       zipCode: "94551", region: "East Bay",  color: "yellow", logo: "/images/campuses/las-positas.png",  lat: 37.6877, lng: -121.7665 },
  { name: "Evergreen Valley College",city: "San Jose",        zipCode: "95135", region: "South Bay", color: "teal",   logo: "/images/campuses/evergreen.png",    lat: 37.3052, lng: -121.7820 },
  { name: "Mission College",         city: "Santa Clara",     zipCode: "95054", region: "South Bay", color: "amber",  logo: "/images/campuses/mission.png",      lat: 37.3895, lng: -121.9853 },
];
