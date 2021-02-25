import { Route, Redirect } from "react-router-dom";
function ProtectedRoute({component: Component, ...rest}) {
    return (
        <Route {...rest} render={(props) => {
             return localStorage.getItem('isAuthenticated')
              ? <Component {...props}/>
              :  <Redirect to="/login"/>
            }}/>
    )
}

export default ProtectedRoute
