import { geoProps } from "../App";
const apiKey = import.meta.env.VITE_API_KEY;
const fetchGeoData = async (ipAddress: string | null): Promise<geoProps> => {
  const url = ipAddress
    ? `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`
    : `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch Data");
  }
  return res.json();
};

export default fetchGeoData;
