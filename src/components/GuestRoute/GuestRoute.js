import { Route, Redirect } from "react-router-dom";
function GuestRoute({component: Component, ...rest}) {
    return (
        <Route {...rest} render={(props) => {
             return !localStorage.getItem('isAuthenticated')
              ? <Component {...props}/>
              :  <Redirect to="/"/>
            }}/>
    )
}

export default GuestRoute