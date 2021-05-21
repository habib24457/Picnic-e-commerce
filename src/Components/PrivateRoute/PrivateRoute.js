import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {UserContext} from '../../App';


const PrivateRoute = ({ children, ...rest }) => {
     const [loggedinUser,setLoggedinUser] = useContext(UserContext);
    console.log(setLoggedinUser);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                (loggedinUser.email || sessionStorage.getItem('token')) ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};

export default PrivateRoute;