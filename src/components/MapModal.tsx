import { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box, Button, Center, Flex, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Popover,
  PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line import/no-webpack-loader-syntax
(mapboxgl as any).workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MAPBOX_TOKEN = 'pk.eyJ1IjoibmFodWNhc3RybyIsImEiOiJjbGlhYTAwcmgwMWRmM2VseDkyNWhjaDR1In0.tHQepuLTFZYdI8XuIpyBjg';

type MapComponentProps = {
  isOpen: boolean,
  onClose: () => void,
  markers: {
    latitude: number,
    longitude: number,
    id: number,
    title: string,
    image: string,
    description: string,
  }[]
}

export const MapModal = ({ isOpen, onClose, markers }: MapComponentProps) => {
  const [viewState, setViewState] = useState({
    latitude: -34.61773011503033,
    longitude: -58.36862775813192,
    zoom: 14
  });
  const navigate = useNavigate();
  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Search a post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Box flex={1} h={700}>
              <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={MAPBOX_TOKEN}
              >
                {markers.map((marker) => (
                  <Popover placement='top-start'>
                    <PopoverTrigger>
                      <Marker
                        key={marker.id}
                        longitude={marker.longitude}
                        latitude={marker.latitude}
                        color="red"
                        style={{ cursor: 'pointer' }}
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverCloseButton />
                      <PopoverHeader>
                        <Heading size="sm">{marker.title}</Heading>
                      </PopoverHeader>
                      <PopoverBody>
                        <Image src={marker.image} />
                        <Text>{marker.description}</Text>
                      </PopoverBody>
                      <PopoverFooter>
                        <Flex justifyContent="flex-end">
                          <Button colorScheme="blue" onClick={() => { navigate(`/post/${marker.id}`); }}>
                            See more
                          </Button>
                        </Flex>
                      </PopoverFooter>
                    </PopoverContent>
                  </Popover>
                ))}
              </Map>
            </Box>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}