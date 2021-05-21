import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import firebase from 'firebase';
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link, useHistory, useLocation, } from "react-router-dom";
import { UserContext } from "../../App";
import loginBack from '../../images/loginback.jpg';
import Footer from '../Footer/Footer';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}




const Login = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
    });

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/home" } };
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);

    console.log(loggedinUser);

    /**Sign in with google */
    const handleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email };
                setUser(signedInUser);
                setLoggedinUser(signedInUser);
                sessionStorage.setItem('email', email);
                setUserToken();
                history.replace(from);
            }).catch((error) => {
                console.log(error);
            });
    }

    /**facebook login */
    const handleFacebookSignIn = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email };
                setUser(signedInUser);
                setLoggedinUser(signedInUser);
                sessionStorage.setItem('email', email);
                setUserToken();
                history.replace(from);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**Set user token to session storage*/
    const setUserToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
            sessionStorage.setItem('token', idToken);
        }).catch(function (error) {
            // Handle error
        });
    }


    return (
        <Container>
            <div className="row">
                <div className="col-md-12">
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand className="text-success" href="/home">Picnic Super Market</Navbar.Brand>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <Nav.Link href="/home">Home</Nav.Link>
                                <h5>{user.name}</h5>
                                <Link to="/home">
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-6 mt-5">
                    <button className="button-design" onClick={handleSignIn}>
                        <FontAwesomeIcon icon={faGoogle} size="1x" />
                       Signin with Google
                        </button>
                    <br />
                    <button className="button-design" onClick={handleFacebookSignIn}>
                        <FontAwesomeIcon icon={faFacebook} size="1x" />
                        Signin with facebook
                        </button>
                </div>
                <div className="col-md-6">
                    <img src={loginBack} style={{ width: '550px', height: '550px' }} alt="loginBack" />
                </div>
            </div>
            <Footer></Footer>
        </Container>
    );
};

export default Login;