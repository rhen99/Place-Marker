import React, {useRef, useState, useEffect, useContext} from 'react';
import mapboxgl from 'mapbox-gl';
import { AuthContext } from "./AuthProvider";
import { firestore, firebase } from '../firebase/config'

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

    const getPlaces = async () => {
        const placesArr = [];
        try {
            const qss = await firestore.collection('places').get();

            qss.forEach(doc => {

                const data = {
                    title: doc.data().title,
                    description: doc.data().description,
                    latitude: doc.data().location.latitude,
                    longitude: doc.data().location.longitude
                }
                placesArr.push(data);
            });
        } catch (error) {
            console.error(error);
        }
        setPlaces(placesArr);
    }

    const setModal = (state) => setShow(state); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        
        if(!place.title || !place.description) return setError('Please fill in your title, and description');

        if(place.longitude === '' || place.latitude === '') return setError('Please fill in your longitude, and latitude.');

        if(useCurrentLocation){
            const success = async (position) => {
                 
                try {
                    const data = {
                    title: place.title,
                    description: place.description,
                    location: new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude)

                }
                    await firestore.collection('places').add(data);
                    
                } catch (error) {
                    console.error(error)
                    
                }

                
            }
            const error = () => alert('Geolocation Failed');
            
            navigator.geolocation.getCurrentPosition(success, error);
            
        }else{
            try {
                const data = {
                    title: place.title,
                    description: place.description,
                    location: new firebase.firestore.GeoPoint(parseFloat(place.latitude), parseFloat(place.longitude))
                }
                await firestore.collection('places').add(data);
            } catch (error) {
                console.error(error);
            }
        }
        
        setSuccess('Added Successfully');
        getPlaces();
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