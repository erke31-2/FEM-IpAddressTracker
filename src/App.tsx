import { useQuery } from "@tanstack/react-query";
import Header from "./components/Header";
import Map from "./components/Map";
import fetchGeoData from "./utils/fetchGeoData";
import { PointTuple } from "leaflet";
import { useState } from "react";

export type geoProps = {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: number;
  };
  as: {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
  };
  isp: string;
};

const App = () => {
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const { data, isLoading, isError, error } = useQuery<geoProps>({
    queryKey: ["geoData", ipAddress],
    queryFn: () => fetchGeoData(ipAddress),
  });
  const lat = data?.location.lat ?? 0;
  const lng = data?.location.lng ?? 0;
  const coordinates: PointTuple = [lat, lng];

  let content;
  if (isLoading) {
    content = <p className="fetch-error">Loading...</p>;
  } else if (isError && error instanceof Error) {
    content = <p className="fetch-error">Error: {error.message}</p>;
  } else {
    content = <Map coordinates={coordinates} />;
  }

  return (
    <>
      <Header data={data} setIpAddress={setIpAddress} />
      <main>{content}</main>
    </>
  );
};
export default App;
