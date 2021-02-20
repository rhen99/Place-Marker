import { useContext, useEffect } from 'react';
import { PlaceContext } from "../../contexts/PlaceProvider";
function Map() {
    const styles = {
        backgroundColor: "#ddd",
        minHeight: "calc(100vh - 56px)"
    }
    const { mapContainer, places, addMarkers } = useContext(PlaceContext);

    useEffect(() => {
        addMarkers(places);
    }, [places])
    return (
        <div id="map" style={styles} ref={el => mapContainer.current = el}>
            
        </div>
    )
}

export default Map
