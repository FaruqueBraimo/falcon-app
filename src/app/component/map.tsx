import { Flex } from "@chakra-ui/react";
import { MapProvider } from "../mapProvider";
import { GoogleMap } from "@react-google-maps/api";

const defaultMapContainerStyle = {
  width: "100%",
  height: "70vh",
  borderRadius: "15px 0px 0px 15px",
};

const defaultMapZoom = 10;

const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
};

export default function MapComponent({ location }: any) {
  const isDataReady = Object.keys(location || {}).length !== 0;

  return (
    <>
      {isDataReady && (
        <Flex direction="column" pb="1rem" px={{ base: "3rem", md: "17rem" }}>
          <MapProvider>
            <GoogleMap
              mapContainerStyle={defaultMapContainerStyle}
              center={{
                lat: Number(location.lat),
                lng: Number(location.lon),
              }}
              zoom={defaultMapZoom}
              options={defaultMapOptions}
            ></GoogleMap>
          </MapProvider>
        </Flex>
      )}
    </>
  );
}
