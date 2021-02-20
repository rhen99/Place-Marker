import React, {useRef, useState, useEffect} from 'react';
import mapboxgl from 'mapbox-gl';

export const PlaceContext = React.createContext();
function PlaceProvider({children}) {

    const mapContainer = useRef();
    
    const [map, setMap] = useState(null);

    const [places, setPlaces] = useState([]);

    const [place, setPlace] = useState({
        title: '',
        description: '',
        longitude: 0,
        latitude: 0,
        user_id: null
    });

    const [useCurrentLocation, setUseCurrentLocation] = useState(true);

    const [show, setShow] = useState(false);

    const addMarkers = (markers) => {
        markers.forEach(marker => {
            new mapboxgl.Marker().setLngLat([marker.longitude, marker.latitude]).addTo(map);
        });
    }

    const getPlaces = () => {
        setPlaces([
            {
                title: "test1",
                description: "test1",
                latitude: 14.8103,
                longitude: 120.7867
            },
            {
                title: "test2",
                description: "test2",
                latitude: 14.8300,
                longitude: 120.7011
            },
            {
                title: "test3",
                description: "test3",
                latitude: 14.9213,
                longitude: 120.1234
            },
            {
                title: "test4",
                description: "test5",
                latitude: 14.8601,
                longitude: 120.8867
            },
        ]);
    }

    const setModal = (state) => setShow(state); 


    useEffect(() => {
        const initializeMap = ({ setMap, mapContainer }) => {
            const success = (position) => {
                const map = new mapboxgl.Map({
                    container: mapContainer.current,
                    center: [position.coords.longitude, position.coords.latitude],
                    style: 'mapbox://styles/mapbox/light-v10',
                    zoom: 9
                });
                map.on('load', () => {
                    setMap(map);
                    getPlaces();
                    

                });

            }
            const error = () => {
                console.log('Geolocation Failed');
            }
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(success, error);
            }else{
                alert('Your browser doesn\'t support Geolocation');
            }
        }
        if(!map){
            initializeMap({setMap, mapContainer})
            
        }
    }, [map, places]);
    
    const value = {
        mapContainer,
        addMarkers,
        places,
        setModal,
        useCurrentLocation,
        setUseCurrentLocation,
        show,
        setPlace,
        place
    }

    return (
        <PlaceContext.Provider value={value}>
            {children}
        </PlaceContext.Provider>
    )
}

export default PlaceProvider
