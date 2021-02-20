import Navbar from './components/Navbar/Navbar';
import ProtectedComponents from './components/ProtectedComponents/ProtectedComponents';

import PlaceProvider from "./contexts/PlaceProvider";
function App() {
  return (
    <PlaceProvider>
      <Navbar/>
      <ProtectedComponents/>
    </PlaceProvider>
  );
}

export default App;
