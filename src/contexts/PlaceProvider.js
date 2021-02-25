import React, {useRef, useState, useEffect, useContext} from 'react';
import mapboxgl from 'mapbox-gl';
import { AuthContext } from "./AuthProvider";

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
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [useCurrentLocation, setUseCurrentLocation] = useState(true);

    const [show, setShow] = useState(false);

    const { isAuthenticated } = useContext(AuthContext);

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
                longitude: 120.7867,
                user_id: 1
            },
            {
                title: "test2",
                description: "test2",
                latitude: 14.8300,
                longitude: 120.7011,
                user_id: 1
            },
            {
                title: "test3",
                description: "test3",
                latitude: 14.9213,
                longitude: 120.1234,
                user_id: 1
            },
            {
                title: "test4",
                description: "test5",
                latitude: 14.8601,
                longitude: 120.8867,
                user_id: 1
            },
        ]);
    }

    const setModal = (state) => setShow(state); 

    const handleSubmit = (e) => {
        e.preventDefault();

        setError('');
        
        if(!place.title || !place.description) return setError('Please fill in your title, and description');

        if(place.longitude === '' || place.latitude === '') return setError('Please fill in your longitude, and latitude.');

        if(useCurrentLocation){
            const success = (position) => {
                const data = {
                    title: place.title,
                    description: place.description,
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                    user_id: 1

                }
                setPlaces([...places, data]);

                
            }
            const error = () => alert('Geolocation Failed');
            
            navigator.geolocation.getCurrentPosition(success, error);
            
        }else{
            setPlaces([...places, place]);
            
        }
        setSuccess('Added Successfully');
    }

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
            const error = () => alert('Geolocation Failed');

            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(success, error);
            }else{
                alert('Your browser doesn\'t support Geolocation');
            }
        }
        if(isAuthenticated){
            if(!map){
                initializeMap({setMap, mapContainer})
                console.log(map);
            }
        }
    }, [map, places, isAuthenticated]);
    
    const value = {
        mapContainer,
        addMarkers,
        places,
        setModal,
        useCurrentLocation,
        setUseCurrentLocation,
        show,
        setPlace,
        place,
        handleSubmit,
        error,
        success
    }

    return (
        <PlaceContext.Provider value={value}>
            {children}
        </PlaceContext.Provider>
    )
}

export default PlaceProvider