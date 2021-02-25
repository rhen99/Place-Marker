import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import GuestRoute from "./components/GuestRoute/GuestRoute";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProtectedComponents from './components/ProtectedComponents/ProtectedComponents';

import PlaceProvider from "./contexts/PlaceProvider";
import AuthProvider from "./contexts/AuthProvider";
import Login from './components/Login/Login';
function App() {
  return (
    <Router>
      <AuthProvider>
      <PlaceProvider>
        <Navbar/>
        <Switch>
          <GuestRoute component={Login} path="/login"/>
          <ProtectedRoute component={ProtectedComponents} path="/"/>
        </Switch>
      </PlaceProvider>
    </AuthProvider>
    </Router>
    
  );
}

export default App;
