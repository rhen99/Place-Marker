import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1IjoibGluY29sZGFyaGVuOTkiLCJhIjoiY2tsYzV0bjFhMDQybjJ2bjFmdTdtbDJvZyJ9.yk6MOqmDywhFXxwjl16Vsw";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
